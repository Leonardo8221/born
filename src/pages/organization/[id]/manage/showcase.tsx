import Tabs from "@/components/molecules/Tab/Tabs";
import Showcase from "@/components/page-components/marketing/Showcase";
import WrapperManage from "@/components/page-components/marketing/WrapperManage";
import Toast from "@/components/page-components/Toast";
import { GET_ORGANIZATION_BY_ID } from "@/queries/organizations";
import { apiConfig } from "@/utils/apiConfig";
import { useQuery } from "@apollo/client";
import { OrganizationResourceApi, OrganizationRestDTO } from "client/command";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ShowCase() {
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

  const currentOrganization =
    data?.userOrganizationByOrganizationId?.organization;

  const handleUpdateOrganizationDetails = async (
    organizationRestDTO: OrganizationRestDTO
  ) => {
    try {
      const config: any = await apiConfig();
      const api = new OrganizationResourceApi(config);
      await api.apiOrganizationUpdateOrganizationDetailsPut(
        organizationId,
        organizationRestDTO
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
    },
    {
      id: 2,
      label: "Marketing",
      content: <></>,
      link: `/organization/${router.query.id}/manage/marketing`,
    },
  ];

  return (
    <>
      <WrapperManage currentTab={"profile"} organization={currentOrganization}>
        <Tabs active={1} tabs={tabs} />
        <Showcase
          handleUpdateOrganizationDetails={handleUpdateOrganizationDetails}
          organization={currentOrganization}
        />
      </WrapperManage>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </>
  );
}
