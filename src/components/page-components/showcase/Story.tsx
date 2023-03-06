import { CollectionCard } from "@/components/molecules/CollectionCard";
import backgroundImageSrc from '@/assets/images/collection-card/product-banner.png';
import Description from "../Collections/Description";
import YourCollections from "./YourCollections";

const Story = () => {
  return (
    <div>
      <CollectionCard
        backgroundImageSrc={backgroundImageSrc}
        editBanner
        onEdit={(e: any) => e.preventDefault()}
      />
      <Description />
      <YourCollections />
    </div>
  )
}

export default Story;
