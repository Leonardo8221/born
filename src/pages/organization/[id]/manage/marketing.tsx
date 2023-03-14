import Tabs from "@/components/molecules/Tab/Tabs";
import Marketing from "@/components/page-components/marketing/Marketing";
import WrapperManage from "@/components/page-components/marketing/WrapperManage";
import { useQuery } from '@apollo/client';
import { GET_ORGANIZATION_BY_ID } from "@/queries/organizations";
import { useRouter } from "next/router";
import { OrganizationGraphqlDto } from "@/generated/types";
import { apiConfig } from "@/utils/apiConfig";
import { CollectionResourceApi, OrganizationResourceApi, OrganizationRestDTO } from "client/command";
import { useState } from "react";
import Toast from "@/components/page-components/Toast";

export interface OrganizationProps {
  organization: OrganizationGraphqlDto | null;
  handleUpdateOrganizationDetails?: (
    organizationRestDTO: OrganizationRestDTO
  ) => Promise<void>;
}

const MarketingPage = () => {
	const router = useRouter();
  const { data, loading, refetch } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
  });

	const currentOrganization = data?.userOrganizationByOrganizationId?.organization;

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
          organization={currentOrganization}
        />
      </WrapperManage>
    </>
  );
};

export default MarketingPage;
