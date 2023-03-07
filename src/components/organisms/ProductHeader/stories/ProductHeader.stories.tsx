import { StoryFn } from "@storybook/react";
import ProductHeader, { ProductHeaderProps } from "..";

export default {
	title: "Organisms/Product Header",
	component: ProductHeader,
};

const Template = (args: ProductHeaderProps) => <ProductHeader {...args} />;

export const Default: StoryFn<ProductHeaderProps> = Template.bind({});
Default.args = {
    title: "Medium pave star hoop hearing",
    onEdit: () => {},
    onAddToCollection: () => {},
    onDraftOrder: () => {},
    onBack: () => {},
};