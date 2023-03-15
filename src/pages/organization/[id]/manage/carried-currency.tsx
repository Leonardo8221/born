import ManageLayout from "@/components/layouts/ManageLayout";
import Tabs from "@/components/molecules/Tab/Tabs";
import CarriedCurrencies from "@/components/page-components/marketing/CarriedCurrencies";
// import WrapperManage from "@/components/page-components/marketing/WrapperManage";
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
      link: `/organization/${router.query.id}/manage/terms-and-condition/`,
    },
    {
      id: 2,
      label: "Carried currencies",
      content: <></>,
    },
  ];
  return (
    <ManageLayout>
      <Tabs active={2} tabs={tabs} />
      <CarriedCurrencies organization={currentOrganization} />
    </ManageLayout>
  );
};

export default TermsAndConditionPage;
