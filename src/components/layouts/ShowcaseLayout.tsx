import { useRouter } from "next/router";
import { DropdownMenu } from "@/components/molecules/DropdownMenu";
import { Header } from "@/components/molecules/Header";
import { Icon } from "@/components/molecules/Icon";
import Footer from "./Footer";
import { signOut } from "next-auth/react";

interface LayoutProps<T> {
  children: React.ReactNode;
}

export default function ShowcaseLayout<T>({ children }: LayoutProps<T>) {
  const router = useRouter();

  const items = [
    {
      label: "Retailer",
      href: "#",
    },
  ];

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  const dropdownMenus = [
    {
      label: "Profile",
      value: "profile",
      action: () => router.push("#"),
    },
    {
      label: "Ordering",
      value: "ordering",
      action: () => router.push("#"),
    },
    {
      label: "Teams",
      value: "teams",
      action: () => router.push("#"),
    },
    {
      label: "Settings",
      value: "settings",
      action: () => router.push("#"),
    },
    {
      label: "Switch accounts",
      value: "switch-accounts",
      action: () => router.push("#"),
    },
    {
      label: "Sign out",
      value: "sign-out",
      action: () => handleSignOut(),
    },
  ];

  const rightNavNode = (
    <div className="flex items-center gap-x-4">
      <div className="h-10 w-10 flex items-center justify-center">
        <Icon
          name="icon-bag"
          height={20}
          width={20}
          className="cursor-pointer text-shades-black"
        />
      </div>
      <DropdownMenu options={dropdownMenus} />
    </div>
  );

  return (
    <>
      <Header items={items} rightNavNode={rightNavNode} fixed />
      <main className="min-h-[calc(100vh-72px)] pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}
