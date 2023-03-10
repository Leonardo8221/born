import { FC } from "react";
import { CollectionCard } from "@/components/molecules/CollectionCard";
import { Heading } from "@/components/molecules/Heading";
import { Button } from "@/components/molecules/Button";
import { Icon } from "@/components/molecules/Icon";
import bgImage1 from "@/assets/images/collection-card/collection-card-background-image.png";
import InnerCardImage from "@/assets/images/collection-card/inner-collection-card-image.png";

interface YourCollectionProps {
  onViewCollections: (e: any) => void;
}

const YourCollections: FC<YourCollectionProps> = ({ onViewCollections }) => {
  return (
    <div className="max-w-[1120px] mx-auto">
      <Heading
        as="h3"
        size="sm"
        className="mt-[64px] !font-light text-shades-black text-center"
      >
        Your Collections
      </Heading>
      <div className="flex mt-10">
        <CollectionCard
          backgroundImageSrc={bgImage1}
          imageSrc={InnerCardImage}
          label="SS23"
          cardClasses="!h-[272px] !max-w-auto min-w-[736px]"
        />
        <CollectionCard
          backgroundImageSrc={bgImage1}
          imageSrc={InnerCardImage}
          label="SS23"
          hasOverlay
          cardClasses="!h-[272px] !max-w-auto min-w-[736px]"
        />
      </div>
      <div className="mt-48px">
        <Button
          onClick={onViewCollections}
          variant="link"
          className="!bg-shades-white !text-shades-black"
        >
          View all collections <Icon name="icon-arrow-right" />
        </Button>
      </div>
    </div>
  );
};

export default YourCollections;
