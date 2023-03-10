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
