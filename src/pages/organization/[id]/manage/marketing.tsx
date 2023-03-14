import Tabs from "@/components/molecules/Tab/Tabs";
import CarriedCurrencies from "@/components/page-components/marketing/CarriedCurrencies";
import Marketing from "@/components/page-components/marketing/Marketing";
import Showcase from "@/components/page-components/marketing/Showcase";
import TermsAndConditions from "@/components/page-components/marketing/TermsAndConditions";
import WrapperMarketing from "@/components/page-components/marketing/WrapperMarketing";
import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_ORGANIZATION_BY_ID } from "@/queries/organizations";
import { useRouter } from "next/router";
import { OrganizationGraphqlDto } from "@/generated/types";

export interface OrganizationProps {
	organization: OrganizationGraphqlDto | null
}

const MarketingPage = () => {
	const [currentOrganization, setCurrentOrganization] =
    useState<OrganizationGraphqlDto | null>(null);
	const router = useRouter();
  const { data, loading } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(router.query.id) },
  });

	useEffect(() => {
    const organization = data?.userOrganizationByOrganizationId?.organization;
    if (organization) {
     setCurrentOrganization(organization);
    }
  }, [data, loading]);

	// if (!data && !loading) {
  //   //redirect or show message
  // }

	const [activeTab, setActiveTab] = useState<string | number>("profile");

	const handleTabChange = (id: string | number) => {
		router.push(`/organization/${router.query.id}/manage/marketing?tab=${id}`);
		setActiveTab(id);
	};
	
	useEffect(() => {
		if(router.isReady){
			const activeTab = (router.query?.tab || "profile") as string | number;
			handleTabChange(activeTab);
		}
	}, [router.isReady]);

	const profileTabs = [
    {
      id: 1,
      label: 'Showcase',
      content: <Showcase organization={currentOrganization} />,
    },
    {
      id: 2,
      label: 'Marketing',
      content: <Marketing organization={currentOrganization} />,
    },
  ];
	const orderingTabs = [
		{
			id: 1,
			label: "Terms and conditions",
			content: <TermsAndConditions organization={currentOrganization} />,
		},
		{
			id: 2,
			label: "Carried currencies",
			content: <CarriedCurrencies />,
		},
	];

	return (
		<WrapperMarketing
			currentTab={activeTab}
			onTabChange={handleTabChange}
			hrefBack="/"
			hrefClose="/"
			organization={currentOrganization}
		>
			{activeTab === 'profile' && <Tabs tabs={profileTabs} />}
			{activeTab === 'ordering' && <Tabs tabs={orderingTabs} />}
		</WrapperMarketing>
	);
};

export default MarketingPage;
