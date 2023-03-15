import ManageLayout from "@/components/layouts/ManageLayout";
import Tabs from "@/components/molecules/Tab/Tabs";
import Account from "@/components/page-components/marketing/Account";
import Notifications from "@/components/page-components/marketing/Notifications";

const SettingsPage = () => {

  const tabs = [
    {
      id: 1,
      label: "Account",
      content: <Account />,
    },
    {
      id: 2,
      label: "Notifications",
      content: <Notifications />
    },
  ];
  return (
    <ManageLayout>
      <Tabs active={1} tabs={tabs} />
    </ManageLayout>
  );
};

export default SettingsPage;
