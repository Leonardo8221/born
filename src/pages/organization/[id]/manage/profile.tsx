import ManageLayout from '@/components/layouts/ManageLayout';
import Tabs from '@/components/molecules/Tab/Tabs';
import Loading from '@/components/page-components/Loading';
import Marketing from '@/components/page-components/marketing/Marketing';
import Showcase from '@/components/page-components/marketing/Showcase';
import { GET_ORGANIZATION_BY_ID } from '@/queries/organizations';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const router = useRouter();
  const { data, loading, refetch } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
    notifyOnNetworkStatusChange: true,
    skip: !router?.query?.id,
  });
  const currentOrganization =
    data?.userOrganizationByOrganizationId?.organization;

  const tabs = [
    {
      id: 1,
      label: 'Showcase',
      content: !currentOrganization && loading ? (
        <Loading message="Loading showcase data..." />
      ) : (
        <Showcase organization={currentOrganization} refetch={refetch} />
      ),
    },
    {
      id: 2,
      label: 'Marketing',
      content: !currentOrganization && loading ? (
        <Loading message="Loading marketing data..." />
      ) : (
        <>
          <Marketing organization={currentOrganization} />
        </>
      ),
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

export default ProfilePage;
