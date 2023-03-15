import React, { FC, useEffect, useState } from "react";
// import TopBar, { TopBarProps } from "./TopBar";
// import Sidebar, { TabMenu } from "@/components/molecules/Sidebar";
import LogoImage from "@/assets/images/logo-image.png";
import Footer from "@/components/layouts/Footer";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { OrganizationGraphqlDto } from "@/generated/types";

interface WrapperManageProps {
  children: React.ReactNode | React.ReactNode[];
  currentTab: string;
  organization: OrganizationGraphqlDto,
}

const WrapperManage: FC<WrapperManageProps> = ({
  children,
  organization,
  currentTab,
}) => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      {/* <TopBar onClose={router.back} onBack={router.back} />
      <div className="flex">
        <Sidebar
          onSignOut={handleSignOut}
          title={organization?.name || ""}
          currentTab={currentTab}
          onTabChange={(newTab) => {
            if (newTab === "profile") {
              router.push(`/organization/${router.query.id}/manage/showcase`);
            } else if (newTab === "ordering") {
              router.push(
                `/organization/${router.query.id}/manage/terms-and-condition`
              );
            } else if (newTab === "teams") {
              router.push(`/organization/${router.query.id}/manage/team`);
            }
          }}
          logoUrl={LogoImage.src}
          menuItems={[
            {
              value: "profile",
              name: "Profile",
              icon: "icon-user",
            },
            {
              value: "ordering",
              name: "Ordering",
              icon: "icon-bag",
            },
            {
              value: "teams",
              name: "Teams",
              icon: "icon-users",
            },
            {
              value: "settings",
              name: "Settings",
              icon: "icon-settings",
            },
            {
              value: "switch-accounts",
              name: "Switch Account",
              icon: "icon-swap",
            },
          ]}
        />
        <div className="px-[32px] py-[24px]">{children}</div>
      </div>
      <Footer /> */}
      <div>Work in progress</div>
    </>
  );
};

export default WrapperManage;
