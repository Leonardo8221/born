import ProductDetails from "@/components/organisms/ProductDetails";
import ProductHeader from "@/components/organisms/ProductHeader";
import Product1 from "@/assets/images/products/product-1.png";
import Product2 from "@/assets/images/products/product-2.png";
import Product3 from "@/assets/images/products/product-3.png";
import { products } from "@/components/organisms/Tables/Product/ListTable/data";
import ProductList from "@/components/page-components/common/ProductList";
import { Button } from "@/components/molecules/Button";
import { Icon } from "@/components/molecules/Icon";
import Link from "next/link";
import Footer from "@/components/layouts/Footer";

const ProductPage = () => {
  return (
    <>
      <ProductHeader
        title="Medium pave star hoop hearing"
        onEdit={() => {}}
        onAddToCollection={() => {}}
        onDraftOrder={() => {}}
        onBack={() => {}}
        containerClassName="mt-[42px] mb-[64px]"
      />
      <div className="max-w-[1200px] mx-auto">
        <ProductDetails
          productImages={[
            {
              src: Product1.src,
              height: 1464,
              width: 1464,
              blurDataURL: Product1.src,
            },
            {
              src: Product3.src,
              height: 1464,
              width: 1464,
              blurDataURL: Product3.src,
            },
            {
              src: Product2.src,
              height: 1464,
              width: 1464,
              blurDataURL: Product2.src,
            },
          ]}
          priceList={[
            {
              currency: "USD",
              list: [
                {
                  label: "Landed",
                  price: "3,345.00",
                },
                {
                  label: "Exworks",
                  price: "2,876.00",
                },
                {
                  label: "MSRP",
                  price: "5,456.00",
                },
              ],
            },
            {
              currency: "GBP",
              list: [
                {
                  label: "Landed",
                  price: "3,345.00",
                },
                {
                  label: "Exworks",
                  price: "2,876.00",
                },
                {
                  label: "MSRP",
                  price: "5,456.00",
                },
              ],
            },
          ]}
          description="The cimento vases exude the natural look of cement. Their refined shape presents a different perspective on a material known for its stiffness and inflexibility. Available in two sizes, narrow and wide."
          colors={["#77502A"]}
          tags={[
            {
              title: "Season",
              list: ["SS23"],
            },
            {
              title: "Collections",
              list: ["Spring Summer 23", "Core"],
            },
          ]}
          specifications={[
            {
              label: "Made in",
              value: "Italy",
            },
            {
              label: "Style",
              value: "ERO21103",
            },
            {
              label: "Composition",
              value: "Cotton",
            },
            {
              label: "Material",
              value: "80% cotton, 20% polyester",
            },
            {
              label: "Composition",
              value: "100% Acetate",
            },
            {
              label: "Measurements",
              value: "26 - 32 inch",
            },
            {
              label: "Colors",
              value:
                "black, white, Grey, red, orange, yellow, blue, Green, Purple, pink",
            },
            {
              label: "Color Code",
              value:
                "BLCK, WHTE, GREY, REDD, ORNG, YLLW, BLUE, GREN, PRPL, PINK",
            },
            {
              label: "Color Family",
              value:
                "Black, Blue, Green, Grey, Orange, Pink, Purple, Red, Yellow, White",
            },
            {
              label: "Delivery start",
              value: "03/09/23",
            },
            {
              label: "Delivery end",
              value: "03/12/23",
            },
          ]}
        />
        <div className="flex justify-between mt-[70px] mb-[40px]">
          <h2 className="text-[32px]">From this collection</h2>
          <Link href="/" className="flex align-center">
            View More <Icon className="ml-[6px]" name="icon-arrow-right" />
          </Link>
        </div>
        <ProductList
          gridType={"grid"}
          products={products.slice(0, 3)}
          selectable={false}
          onSelect={() => {}}
          selectedProducts={[]}
        />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
