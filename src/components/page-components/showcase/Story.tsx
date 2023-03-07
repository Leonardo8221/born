import { CollectionCard } from "@/components/molecules/CollectionCard";
import backgroundImageSrc from '@/assets/images/collection-card/product-banner.png';
import Description from "../Collections/Description";
import YourCollections from "./YourCollections";
import SocialLinks from "./SocialLinks";

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
      <SocialLinks />
    </div>
  )
}

export default Story;
