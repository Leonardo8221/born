import WrapperMarketing from "@/components/page-components/marketing/WrapperMarketing";
import { useState } from "react";

const MarketingPage = () => {
	const [currentIndexItemMenu, setCurrentIndexItemMenu] = useState(0);
	const changeCurrentInexItemMenu = (index: number) =>
		setCurrentIndexItemMenu(index);
	return (
		<WrapperMarketing
			currentIndexItem={currentIndexItemMenu}
			onChangeCurrentIndexItem={changeCurrentInexItemMenu}
			hrefBack="/"
			hrefClose="/"
		>
			<h1>Marketing page is under construction!</h1>
		</WrapperMarketing>
	);
};

export default MarketingPage;
