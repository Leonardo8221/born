import { StoryFn } from "@storybook/react";
import { FileUpload, FileUploadProps } from "..";
import { Icon } from "../../Icon";

const storyParameters = {};

export default {
  title: "Molecules/File Upload",
  component: FileUpload,
  decorators: [
    (Story: any) => (
      <div className="flex justify-center">
        <Story />
      </div>
    ),
  ],
};

const argTypes: any = {
  src: {
    control: { type: "text" },
    defaultValue: "",
  },
};

const Template = (args: FileUploadProps) => <FileUpload {...args} />;

export const Banner: StoryFn<FileUploadProps> = Template.bind({});
Banner.argTypes = argTypes;
Banner.args = {
  variant: "rectangle",
};
Banner.parameters = storyParameters;

export const Logo: StoryFn<FileUploadProps> = Template.bind({});
Logo.argTypes = argTypes;
Logo.args = {
  variant: "circle",
  icon: <Icon name="icon-file-upload" />,
};
Logo.parameters = storyParameters;

export const ProductPage: StoryFn<FileUploadProps> = Template.bind({});
ProductPage.argTypes = argTypes;
ProductPage.args = {
  hasFilePreview: false,
  variant: "product",
};
ProductPage.parameters = storyParameters;
