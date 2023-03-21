import ManageLayout from '@/components/layouts/ManageLayout';
import Tabs from '@/components/molecules/Tab/Tabs';
import Account from '@/components/page-components/marketing/Account';
import Notifications from '@/components/page-components/marketing/Notifications';
import { GET_ORGANIZATION_BY_ID } from '@/queries/organizations';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const SettingsPage = () => {
  const router = useRouter();
  const { data } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
  });
  const currentOrganization =
    data?.userOrganizationByOrganizationId?.organization;
  const tabs = [
    {
      id: 1,
      label: 'Account',
      content: <Account />,
    },
    {
      id: 2,
      label: 'Notifications',
      content: <Notifications />,
    },
  ];
  return (
    <ManageLayout
      name={currentOrganization?.name}
      logoUrl={currentOrganization?.logo_url}
    >
      <Tabs active={1} tabs={tabs} />
    </ManageLayout>
  );
};

export default SettingsPage;
