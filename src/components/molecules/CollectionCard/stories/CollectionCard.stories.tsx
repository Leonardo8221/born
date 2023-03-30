import { StoryFn } from "@storybook/react";
import { CollectionCard, CollectionCardProps } from "..";
import backgroundImageSrc from "@/assets/images/collection-card/collection-card-background-image.png";
// import imageSrc from "@/assets/images/collection-card/inner-collection-card-image.png";

export default {
  title: "Molecules/Collection Card",
  component: CollectionCard,
};

const Template = (args: CollectionCardProps) => <CollectionCard {...args} />;

export const Default: StoryFn<CollectionCardProps> = Template.bind({});

Default.args = {
  label: "SS23",
  backgroundImageSrc,
  // imageSrc,
};

export const WithText: StoryFn<CollectionCardProps> = Template.bind({});

WithText.args = {
  label: "SS23",
  backgroundImageSrc,
  // imageSrc,
  author: "by Irene Lance",
  headerText:
    "For the past 40 years Ballot-Flurin has been leading the industry and provide wellness solutions.",
};

export const WithOverlay: StoryFn<CollectionCardProps> = Template.bind({});

WithOverlay.args = {
  label: "SS23",
  backgroundImageSrc,
  // imageSrc,
  hasOverlay: true,
};
