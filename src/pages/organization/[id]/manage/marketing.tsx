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
	const { query } = useRouter();
  const { data, loading } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: Number(query.id) },
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

	const [currentIndexItemMenu, setCurrentIndexItemMenu] = useState(0);
	const changeCurrentInexItemMenu = (index: number) =>
		setCurrentIndexItemMenu(index);

	const profileTabs = [
    {
      id: 1,
      label: 'Showcase',
      content: <Showcase organization={currentOrganization} />,
    },
    {
      id: 2,
      label: 'Marketing',
      content: <Marketing />,
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
			currentIndexItem={currentIndexItemMenu}
			onChangeCurrentIndexItem={changeCurrentInexItemMenu}
			hrefBack="/"
			hrefClose="/"
		>
			{currentIndexItemMenu === 0 && <Tabs tabs={profileTabs} />}
			{currentIndexItemMenu === 1 && <Tabs tabs={orderingTabs} />}
		</WrapperMarketing>
	);
};

export default MarketingPage;
