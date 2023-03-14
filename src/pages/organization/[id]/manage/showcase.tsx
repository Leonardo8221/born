import Tabs from "@/components/molecules/Tab/Tabs";
import Showcase from "@/components/page-components/marketing/Showcase";
import WrapperManage from "@/components/page-components/marketing/WrapperManage";
import { GET_ORGANIZATION_BY_ID } from "@/queries/organizations";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function ShowCase() {
  const router = useRouter();
  const { data, loading } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
  });

  const currentOrganization =
    data?.userOrganizationByOrganizationId?.organization;
  
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
    <WrapperManage currentTab={"profile"} organization={currentOrganization}>
      <Tabs active={1} tabs={tabs} />
      <Showcase organization={currentOrganization} />
    </WrapperManage>
  );
}
