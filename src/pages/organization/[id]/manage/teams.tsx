import ManageLayout from '@/components/layouts/ManageLayout';
import Tabs from '@/components/molecules/Tab/Tabs';
// import Affliations from "@/components/page-components/affliations";
import Teams from '@/components/page-components/teams';
import { GET_ORGANIZATION_BY_ID } from '@/queries/organizations';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const TeamsPage = () => {
  const router = useRouter();
  const { data } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
    fetchPolicy: 'network-only',
    skip: !router?.query?.id,
  });
  const currentOrganization =
    data?.userOrganizationByOrganizationId?.organization;
  const tabs = [
    {
      id: 'team-management',
      label: 'Team Management',
      content: <Teams />,
    },
    // {
    //   id: 'Affliation',
    //   label: 'Affliations',
    //   content: <Affliations />
    // },
  ];
  return (
    <ManageLayout
      name={currentOrganization?.name}
      logoUrl={currentOrganization?.logo_url}
    >
      <Tabs tabs={tabs} />
    </ManageLayout>
  );
};

export default TeamsPage;
