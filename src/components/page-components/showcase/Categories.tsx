import Tabs from "@/components/molecules/Tab/Tabs";
import Collections from "./Collections";
import Products from "./Products";
import Story from "./Story";

const Categories = () => {
  const tabs = [
    {
      id: 1,
      label: "Story",
      content: <Story />,
    },
    {
      id: 2,
      label: "Products",
      content: <Products />,
    },
    {
      id: 3,
      label: "Collections",
      content: <Collections />,
    },
  ]
  return (
    <div>
      <Tabs tabs={tabs} className="justify-center" />
    </div>
  )
}

export default Categories;
