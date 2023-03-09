import Tabs from "@/components/molecules/Tab/Tabs";
import WrapperMarketing from "@/components/page-components/marketing/WrapperMarketing";
import { useState } from "react";

const MarketingPage = () => {
	const [currentIndexItemMenu, setCurrentIndexItemMenu] = useState(0);
	const changeCurrentInexItemMenu = (index: number) =>
		setCurrentIndexItemMenu(index);

	const profileTabs = [
		{
			id: 1,
			label: "Showcase",
			content: <p>showcase</p>,
		},
		{
			id: 2,
			label: "Marketing",
			content: <p>Marketing</p>,
		},
	];
	const orderingTabs = [
		{
			id: 1,
			label: "Terms and conditions",
			content: <p>Terms and conditions</p>,
		},
		{
			id: 2,
			label: "Carried currencies",
			content: <p>Carried currencies</p>,
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
