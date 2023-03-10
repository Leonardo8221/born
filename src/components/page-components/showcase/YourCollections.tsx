import { FC } from "react";
import { CollectionCard } from "@/components/molecules/CollectionCard";
import { Heading } from "@/components/molecules/Heading";
import { Button } from "@/components/molecules/Button";
import { Icon } from "@/components/molecules/Icon";
import bgImage1 from "@/assets/images/collection-card/collection-card-background-image.png";
import InnerCardImage from "@/assets/images/collection-card/inner-collection-card-image.png";
import { COLLECTIONS_QUERY } from "@/queries/collecitons";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { CollectionGraphqlDto } from "@/generated/types";

interface YourCollectionProps {
  onViewCollections: (e: any) => void;
}

const YourCollections: FC<YourCollectionProps> = ({ onViewCollections }) => {
  const { data, loading, error } = useQuery(COLLECTIONS_QUERY);

  const renderCollections = () => {
    return data?.collectionsByOrganizationId?.map(
      (item: CollectionGraphqlDto) =>
        item.id && (
          <Link key={item.id} href={`/organization/1/discover/collections/${item.id}`}>
            <CollectionCard
              backgroundImageSrc={bgImage1}
              imageSrc={InnerCardImage}
              label="SS23"
              cardClasses="!h-[272px] !max-w-auto min-w-[736px]"
            />
          </Link>
        )
    );
  };

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
        {loading ? <div>Loading collections...</div> : renderCollections()}
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
