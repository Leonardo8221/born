import SelectOrganization from "@/components/page-components/organization/SelectOrganization";
import { useSession, signIn } from "next-auth/react";
import backgroundImage from "@/assets/images/sign-bg.png";
import { Button } from "@/components/molecules/Button";
import { Heading } from "@/components/molecules/Heading";
import User from '@/assets/svgs/user.svg';

export default function Home() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div
        className="relative h-screen w-full flex justify-center items-center"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute h-full w-full left-0 top-0 bg-[rgba(30,30,30,0.64)]" />
        <div className="relative z-[2]">
          <User className="mb-8 mx-auto text-shades-white" height={40} width={40} />
          <Heading
            size="sm"
            className="text-shades-white tracking-[0.042em] font-regular"
          >
            You need log in first
          </Heading>
          <Button
            size="lg"
            color="white"
            className="mt-10 !max-w-[180px]"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return <SelectOrganization />;
}
