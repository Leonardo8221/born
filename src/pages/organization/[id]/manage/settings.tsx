import ManageLayout from "@/components/layouts/ManageLayout";
import Tabs from "@/components/molecules/Tab/Tabs";
import Loading from "@/components/page-components/Loading";
// import Account from "@/components/page-components/marketing/Account";
import Marketing from "@/components/page-components/marketing/Marketing";
// import Notifications from "@/components/page-components/marketing/Notifications";
import Showcase from "@/components/page-components/marketing/Showcase";
import { GET_ORGANIZATION_BY_ID } from "@/queries/organizations";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const SettingsPage = () => {
  // const router = useRouter();
  // const { data, loading } = useQuery(GET_ORGANIZATION_BY_ID, {
  //   variables: { id: Number(router.query.id) },
  // });

  // const currentOrganization =
  //   data?.userOrganizationByOrganizationId?.organization;

  // const tabs = [
  //   {
  //     id: 1,
  //     label: "Account",
  //     content: loading ? (
  //       <Loading message="Loading account data..." />
  //     ) : (
  //       <Account />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     label: "Notifications",
  //     content: loading ? (
  //       <Loading message="Loading notifications data..." />
  //     ) : (
  //       <>
  //         <Notifications />
  //       </>
  //     ),
  //   },
  // ];

  return (
    <ManageLayout>
      Settings
    </ManageLayout>
  );
};

export default SettingsPage;
