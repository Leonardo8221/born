import ManageLayout from "@/components/layouts/ManageLayout";
import Image1 from '@/assets/images/retailer/retailer-1.png';
import Image2 from '@/assets/images/retailer/retailer-2.png';
import Image3 from '@/assets/images/retailer/retailer-3.png';
import { CollectionCard } from "@/components/molecules/CollectionCard";
import { Paragraph } from "@/components/molecules/Paragraph";
import ShowcaseLayout from "@/components/layouts/ShowcaseLayout";
import { SearchInput } from "@/components/molecules/SearchInput";
import { Badge } from "@/components/molecules/Badge";
import Logo from '@/assets/images/logo-image.png';

const RetailerPage = () => {
  const data = [
    {
      name: 'Thierry Colson',
      title: 'France',
      description: "Delicate, innocent and relaxed, Thierry Colson's collections always start from a journey memory, the souvenir of a trip...",
      imgSrc: Image2,
    },
    {
      name: 'Thierry Colson',
      title: 'France',
      description: "Delicate, innocent and relaxed, Thierry Colson's collections always start from a journey memory, the souvenir of a trip...",
      imgSrc: Image1,
    },
    {
      name: 'Thierry Colson',
      title: 'France',
      description: "Delicate, innocent and relaxed, Thierry Colson's collections always start from a journey memory, the souvenir of a trip...",
      imgSrc: Image3,
    },
  ]
  return (
    <ShowcaseLayout>
      <div className="max-w-[1120px] mx-auto">
        <div>
          <div className="flex justify-center mt-6 gap-2">
            <SearchInput value="" onClear={() => {}} onEnter={() => {}} />
            <Badge className="h-[32px] w-[93px] !text-center !justify-center cursor-pointer">Countries</Badge>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8">
          {data.map(item => (
            <div key={item.name} className="p-4">
              <CollectionCard
                author={item.title}
                backgroundImageSrc={item.imgSrc}
                imageSrc={Logo}
                label={item.name}
              />
              <Paragraph>{item.description}</Paragraph>
            </div>
          ))}
        </div>
      </div>
    </ShowcaseLayout>
  )
}

export default RetailerPage;
