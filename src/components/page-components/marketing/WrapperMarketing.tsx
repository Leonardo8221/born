import React, { FC, useEffect, useState } from "react";
import TopBar, { TopBarProps } from "./TopBar";
import Sidebar, { TabMenu } from "@/components/molecules/Sidebar";
import LogoImage from "@/assets/images/logo-image.png";
import Footer from "@/components/layouts/Footer";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { OrganizationProps } from "@/pages/organization/[id]/manage/marketing";

interface WrapperMarketingProps extends TopBarProps, TabMenu, OrganizationProps {
	children: React.ReactNode | React.ReactNode[];
}

const WrapperMarketing: FC<WrapperMarketingProps> = ({
	children,
	hrefBack,
	hrefClose,
	organization,
	currentTab,
	onTabChange
}) => {
	const router = useRouter();
	const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };

	return (
		<>
			<TopBar hrefClose={hrefClose} hrefBack={hrefBack} />
			<div className="flex">
				<Sidebar
					onSignOut={handleSignOut}
					title={organization?.name || ""}
					currentTab={currentTab}
					onTabChange={onTabChange}
					logoUrl={LogoImage.src}
					menuItems={[
						{
							value: 'profile',
							name: "Profile",
							icon: "icon-user",
						},
						{
							value: 'ordering',
							name: "Ordering",
							icon: "icon-bag",
						},
						{
							value: 'teams',
							name: "Teams",
							icon: "icon-users",
						},
						{
							value: 'settings',
							name: "Settings",
							icon: "icon-settings",
						},
						{
							value: 'switch-accounts',
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
