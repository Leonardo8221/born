import { Header } from "..";

export default {
  title: "Molecules/Header (WIP)",
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Header1 = Template.bind({});

Header1.args = {
  items: [
    {
      label: "Tab Item",
      href: "#",
    },
  ],
  variant: "header1",
  rightNavNode: <div>Right Nav Node</div>,
};
