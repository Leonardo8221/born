import ManageLayout from '@/components/layouts/ManageLayout';
import Tabs from '@/components/molecules/Tab/Tabs';
import Loading from '@/components/page-components/Loading';
import CarriedCurrencies from '@/components/page-components/marketing/CarriedCurrencies';
import TermsAndConditions from '@/components/page-components/marketing/TermsAndConditions';
import { GET_ORGANIZATION_BY_ID } from '@/queries/organizations';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const OrderPage = () => {
  const router = useRouter();
  const { data, loading, refetch } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
    notifyOnNetworkStatusChange: true,
  });

  const currentOrganization =
    data?.userOrganizationByOrganizationId?.organization;

  const tabs = [
    {
      id: 1,
      label: 'Terms and conditions',
      content: loading ? (
        <Loading message="Loading terms and conditions data..." />
      ) : (
        <TermsAndConditions
          refetch={refetch}
          organization={currentOrganization}
        />
      ),
    },
    {
      id: 2,
      label: 'Carried currencies',
      content: loading ? (
        <Loading message="Loading carried currencies data..." />
      ) : (
        <>
          <CarriedCurrencies organization={currentOrganization} />
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

export default OrderPage;
