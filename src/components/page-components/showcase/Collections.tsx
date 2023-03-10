import Link from "next/link";
import { CollectionCard } from "@/components/molecules/CollectionCard";
import backgroundImageSrc from "@/assets/images/collection-card/collection-card-background-image.png";
import imageSrc from "@/assets/images/collection-card/inner-collection-card-image.png";
import { useQuery } from "@apollo/client";
import { COLLECTIONS_QUERY } from "@/queries/collecitons";
import { CollectionGraphqlDto } from "@/generated/types";

const Collections = () => {
  const { data, loading, error } = useQuery(COLLECTIONS_QUERY);

  if (error) {
    return <div>Something went wrong, please try again!</div>;
  }

  if (loading) {
    return <div>Loading collections...</div>;
  }

  return (
    <div>
      <div>
        {data?.collectionsByOrganizationId?.map(
          (item: CollectionGraphqlDto) => (
            <div key={item.id} className="mb-[96px]">
              <Link href={`/organization/1/discover/collections/${item.id}`}>
                <CollectionCard
                  backgroundImageSrc={backgroundImageSrc}
                  label={item.name || "SS23"}
                  author={"by Irene Lance"}
                  imageSrc={imageSrc}
                />
              </Link>
              <div className="mt-8">
                <p className="max-w-[544px] mx-auto text-shades-black text-center text-[18px] tracking-[0.06em] leading-[32px]">
                  {item.description ||
                    "For the past 40 years Ballot-Flurin has been leading the industry and provide wellness solutions."}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Collections;
