import { FC, useState } from "react";
import { CollectionCard } from "@/components/molecules/CollectionCard";
import backgroundImageSrc from "@/assets/images/collection-card/product-banner.png";
import Modal from "@/components/molecules/Modal";
import Description from "../Collections/Description";
import YourCollections from "./YourCollections";
import SocialLinks from "./SocialLinks";
import FileType from "./FileType";

interface StoryProps {
  onViewCollections: (e: any) => void;
}

const Story: FC<StoryProps> = ({ onViewCollections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");

  return (
    <div>
      <div className="mx-auto w-fit flex align-center mt-[7px] mb-[5px] text-[12px]">
        <div className="mr-16">
          <span className="text-neutral-600 mr-[32px]">Founded in</span>
          <span className="text-shades-black">2011</span>
        </div>
        <div className="mr-16">
          <span className="text-neutral-600 mr-[32px]">Origin</span>
          <span className="text-shades-black">Greece</span>
        </div>
        <div>
          <span className="text-neutral-600 mr-[32px]">
            Currencies
          </span>
          <span className="text-shades-black">USD, GBP</span>
        </div>
      </div>
      <CollectionCard
        backgroundImageSrc={backgroundImageSrc}
        editBanner
        onEdit={(e: any) => e.preventDefault()}
      />
      <Description onUpload={() => setIsOpen(true)} />
      <YourCollections onViewCollections={onViewCollections} />
      <SocialLinks />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="choose a file type"
      >
        <FileType onClick={setType} />
      </Modal>
    </div>
  );
};

export default Story;
