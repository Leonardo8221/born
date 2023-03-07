import { Heading } from "@/components/molecules/Heading";

const SocialLinks = () => {
  const links = [...Array(12)].map((_, index) => index);
  return (
    <div className="mb-[99px]">
      <Heading size="sm" className="mt-12 text-center !font-light" as="h3">Social Links</Heading>
      <div className="grid max-w-[736px] mt-10 mx-auto gap-2 grid-cols-3">
        {
          links.map(item => (
            <div
              key={item}
              className="h-[240px] w-[240px] bg-[#D9D9D9]"
            />
          ))
        }
      </div>
    </div>
  )
}

export default SocialLinks;
