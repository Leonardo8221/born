import { StoryFn } from "@storybook/react";
import ProductHeader, { ProductHeaderProps } from "..";
import LogoImage from "@/assets/images/logo-image.png";

export default {
	title: "Organisms/Product Header",
	component: ProductHeader,
};

const Template = (args: ProductHeaderProps) => <ProductHeader {...args} />;

export const Default: StoryFn<ProductHeaderProps> = Template.bind({});
Default.args = {
	title: "Medium pave star hoop hearing",
	hrefBack: "/",
	srcLogo: LogoImage.src,
	containerClassName: " ",
    srcBlurDataURL:  LogoImage.src,
	onEdit: () => {},
	onAddToCollection: () => {},
	onDraftOrder: () => {},
};