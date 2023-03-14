import Tabs from "@/components/molecules/Tab/Tabs";
import Marketing from "@/components/page-components/marketing/Marketing";
import WrapperManage from "@/components/page-components/marketing/WrapperManage";
import { useQuery } from '@apollo/client';
import { GET_ORGANIZATION_BY_ID } from "@/queries/organizations";
import { useRouter } from "next/router";
import { OrganizationGraphqlDto } from "@/generated/types";
import { apiConfig } from "@/utils/apiConfig";
import { AttachmentResourceApi, CollectionResourceApi, OrganizationResourceApi, OrganizationRestDTO } from "client/command";
import { useState } from "react";
import Toast from "@/components/page-components/Toast";

export interface OrganizationProps {
  organization: OrganizationGraphqlDto | null;
  handleUpdateOrganizationDetails?: (
    organizationRestDTO: OrganizationRestDTO
  ) => Promise<void>;
  handleUploadOrganizationAttachment?: (file: File) => Promise<void>;
  handleUploadCollectionAttachment?: (
    collectionId: number,
    file: File
  ) => Promise<void>;
}

const MarketingPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleErrorMesssage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleSuccessMesssage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
	const router = useRouter();
  const id = router?.query?.id || "";
  const organizationId: number = +id;
  const { data, loading, refetch } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
  });

	const currentOrganization = data?.userOrganizationByOrganizationId?.organization;
  
  const handleUploadOrganizationAttachment = async (
    file: File
  ) => {
    try {
      const config: any = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUploadOrganizationAttachmentPost(
        "LOOKBOOK",
        organizationId,
        file,
        file.name
      );
      refetch();
      handleSuccessMesssage(`Saved data sucessfully!!`);
    } catch (error: any) {
      handleErrorMesssage(
        error?.message || "Something went wrong, please try again!"
      );
      console.error(error);
    }
  };

  const handleUploadCollectionAttachment = async (
    collectionId: number,
    file: File
  ) => {
    try {
      const config: any = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUploadCollectionAttachmentPost(
        collectionId,
        "LOOKBOOK",
        file,
        file.name
      );
      refetch();
      handleSuccessMesssage(`Saved data sucessfully!!`);
    } catch (error: any) {
      handleErrorMesssage(
        error?.message || "Something went wrong, please try again!"
      );
      console.error(error);
    }
  };

	const tabs = [
    {
      id: 1,
      label: "Showcase",
      content: <></>,
      link: `/organization/${router.query.id}/manage/showcase`,
    },
    {
      id: 2,
      label: "Marketing",
      content: <></>,
    },
  ];

	return (
    <>
      <WrapperManage currentTab={"profile"} organization={currentOrganization}>
        <Tabs active={2} tabs={tabs} />
        <Marketing
          handleUploadOrganizationAttachment={
            handleUploadOrganizationAttachment
          }
          handleUploadCollectionAttachment={handleUploadCollectionAttachment}
          organization={currentOrganization}
        />
      </WrapperManage>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </>
  );
};

export default MarketingPage;
