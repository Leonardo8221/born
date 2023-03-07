import ShowcaseLayout from "@/components/layouts/ShowcaseLayout";
import Categories from "@/components/page-components/showcase/Categories";
import ShowcaseLogo from "@/components/page-components/showcase/Logo";

const ShowcasePage = () => {
  return (
    <ShowcaseLayout>
      <div className="mx-auto">
        <ShowcaseLogo />
        <Categories />
      </div>
    </ShowcaseLayout>
  )
}

export default ShowcasePage;
