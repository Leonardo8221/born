import Tabs from "@/components/molecules/Tab/Tabs";
import TermsAndConditions from "@/components/page-components/marketing/TermsAndConditions";
import WrapperManage from "@/components/page-components/marketing/WrapperManage";
import { GET_ORGANIZATION_BY_ID } from "@/queries/organizations";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const TermsAndConditionPage = () => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
  });

  const currentOrganization =
    data?.userOrganizationByOrganizationId?.organization;

  const tabs = [
    {
      id: 1,
      label: "Terms and conditions",
      content: <></>,
    },
    {
      id: 2,
      label: "Carried currencies",
      content: <></>,
      link: `/organization/${router.query.id}/manage/carried-currency/`,
    },
  ];
  return (
    <WrapperManage currentTab={"ordering"} organization={currentOrganization}>
      <Tabs active={1} tabs={tabs} />
      <TermsAndConditions organization={currentOrganization} />
    </WrapperManage>
  );
}

export default TermsAndConditionPage;
