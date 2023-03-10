import TitleHeader from "@/components/organisms/TitleHeader";
import OrgBgImg1 from "@/assets/images/organization/organization-1.png";
import OrgLogoImg1 from "@/assets/images/logo-image.png";
import OrganizationCard, {
  OrganizationCardProps,
} from "@/components/page-components/organization";
import Header from "@/components/page-components/organization/Header";
import { useQuery } from "@apollo/client";
import { ORGANIZATIONS_QUERY } from "@/queries/organizations";

const SelectOrganization = () => {
  const { data, error, loading } = useQuery(ORGANIZATIONS_QUERY);

  const renderOrganizations = () => {
    return data?.userWithOrganizationsAndUpdateLastLoggedInDate?.organizations?.map(
      (org: OrganizationCardProps, index: number) => (
        <OrganizationCard
          key={index}
          {...org}
          id={org.id || index + 1}
          logoUrl={OrgLogoImg1}
          imgSrc={OrgBgImg1}
        />
      )
    );
  };

  if (error) {
    return <div>Something went wrong, please refresh the page!</div>;
  }

  return (
    <div>
      <Header />
      <TitleHeader title="Choose an organization" />
      <div className="max-w-[1120px] grid grid-cols-3 mx-auto gap-[30px] mt-[56px]">
        {loading ? <div>Loading organizations...</div> : renderOrganizations()}
      </div>
    </div>
  );
};

export default SelectOrganization;
