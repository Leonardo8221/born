import React, { FC } from "react";
import TopBar, { TopBarProps } from "./TopBar";
import Sidebar, { IndexItemMenu } from "@/components/molecules/Sidebar";
import LogoImage from "@/assets/images/logo-image.png";
import Footer from "@/components/layouts/Footer";

interface WrapperMarketingProps extends TopBarProps, IndexItemMenu {
	children: React.ReactNode | React.ReactNode[];
}

const WrapperMarketing: FC<WrapperMarketingProps> = ({
	children,
	hrefBack,
	hrefClose,
	currentIndexItem,
	onChangeCurrentIndexItem,
}) => {
	return (
		<>
			<TopBar hrefClose={hrefClose} hrefBack={hrefBack} />
			<div className="flex">
				<Sidebar
					title="Missoma"
					currentIndexItem={currentIndexItem}
					onChangeCurrentIndexItem={onChangeCurrentIndexItem}
					logoUrl={LogoImage.src}
					menuItems={[
						{
							name: "Profile",
							icon: "icon-user",
						},
						{
							name: "Ordering",
							icon: "icon-bag",
						},
						{
							name: "Teams",
							icon: "icon-users",
						},
						{
							name: "Settings",
							icon: "icon-settings",
						},
						{
							name: "Switch Account",
							icon: "icon-swap",
						},
					]}
				/>
				<div className="px-[32px] py-[24px]">{children}</div>
			</div>
			<Footer />
		</>
	);
};

export default WrapperMarketing;
