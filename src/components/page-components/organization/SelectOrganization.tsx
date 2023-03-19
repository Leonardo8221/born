import { useQuery } from '@apollo/client';
import TitleHeader from '@/components/organisms/TitleHeader';
import OrganizationCard, {
  OrganizationCardProps,
} from '@/components/page-components/organization';
import Header from '@/components/page-components/organization/Header';
import { ORGANIZATIONS_QUERY } from '@/queries/organizations';
import placeholderBgImage from '@/assets/images/placeholders/banner.png';
import OrgLogoImg1 from '@/assets/images/logo-image.png';
import ErrorMessage from '../Error/ErrorMessage';
import Loading from '../Loading';

const SelectOrganization = () => {
  const { data, error, loading, refetch } = useQuery(ORGANIZATIONS_QUERY);

  const renderOrganizations = () => {
    return data?.userWithOrganizationsAndUpdateLastLoggedInDate?.organizations?.map(
      (org: OrganizationCardProps, index: number) => (
        <OrganizationCard
          key={index}
          {...org}
          id={org.id}
          logoUrl={org?.logo_url || OrgLogoImg1}
          imgSrc={org?.banner_url || placeholderBgImage}
        />
      )
    );
  };

  if (error) {
    return (
      <div className="mt-[60px]">
        <ErrorMessage errorMessage={error?.message} refetch={refetch} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <TitleHeader title="Choose an organization" />
      {loading ? (
        <div className="mt-[56px]">
          <Loading message="Loading organizations" />
        </div>
      ) : (
        <div className="max-w-[1120px] grid grid-cols-3 mx-auto gap-[30px] mt-[56px]">
          {renderOrganizations()}
        </div>
      )}
    </div>
  );
};

export default SelectOrganization;
