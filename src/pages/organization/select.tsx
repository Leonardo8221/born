import TitleHeader from "@/components/organisms/TitleHeader";
import OrgBgImg1 from '@/assets/images/organization/organization-1.png';
import OrgBgImg2 from '@/assets/images/organization/organization-2.png';
import OrgBgImg3 from '@/assets/images/organization/organization-3.png';
import OrgLogoImg1 from '@/assets/images/logo-image.png';
import OrgLogoImg2 from '@/assets/images/organization/logo-image-2.png';
import OrgLogoImg3 from '@/assets/images/organization/logo-image-3.png';
import OrganizationCard, { OrganizationCardProps } from "@/components/page-components/organization";
import Header from "@/components/page-components/organization/Header";


const SelectOrganizationPage = () => {
  const organizations = [
    {
      id: 1,
      imgSrc: OrgBgImg1,
      organizationName: 'Missoma',
      title: 'Cyprus',
      logoUrl: OrgLogoImg1,
    },
    {
      id: 2,
      imgSrc: OrgBgImg2,
      organizationName: 'Piume Studio',
      title: 'Italy',
      logoUrl: OrgLogoImg2,
    },
    {
      id: 3,
      imgSrc: OrgBgImg3,
      organizationName: 'ZEUS + DIONE',
      title: 'Greece',
      logoUrl: OrgLogoImg3,
    },
  ]
  return (
    <div>
      <Header />
      <TitleHeader title="Choose an organization" />
      <div className="max-w-[1120px] grid grid-cols-3 mx-auto gap-[30px] mt-[56px]">
        {
          organizations?.map((org: OrganizationCardProps, index: number) => (
            <OrganizationCard key={index} {...org} />
          ))
        }
      </div>
    </div>
  )
}

export default SelectOrganizationPage;
