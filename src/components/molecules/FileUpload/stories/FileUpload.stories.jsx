import { FileUpload } from "..";
import { Icon } from "../../Icon";

const storyParameters = {};

export default {
  title: "Molecules/File Upload",
  component: FileUpload,
  decorators: [
    (Story) => (
      <div className="flex justify-center">
        <Story />
      </div>
    ),
  ],
};

const argTypes = {
  src: {
    control: { type: "text" },
    defaultValue: "",
  },
};

const Template = (args) => <FileUpload {...args} />;

export const Banner = Template.bind({});
Banner.argTypes = argTypes;
Banner.args = {
  variant: "rectangle",
};
Banner.parameters = storyParameters;

export const Logo = Template.bind({});
Logo.argTypes = argTypes;
Logo.args = {
  variant: "circle",
  icon: <Icon name="icon-file-upload" />,
};
Logo.parameters = storyParameters;

export const ProductPage = Template.bind({});
ProductPage.argTypes = argTypes;
ProductPage.args = {
  hasFilePreview: false,
  variant: "product",
};
ProductPage.parameters = storyParameters;
