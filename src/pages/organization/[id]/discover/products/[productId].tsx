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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_PRODUCTS_BY_COLLECTION_ID,
  GET_PRODUCT_BY_ID,
} from "@/queries/products";
import { ProductGraphqlDto } from "@/generated/types";
import ErrorMessage from "@/components/page-components/Error/ErrorMessage";
import Loading from "@/components/page-components/Loading";

const ProductPage = () => {
  const router = useRouter();
  const productIdQuery = router?.query?.productId || "";

  const {
    data: product,
    loading: productLoading,
    error: productError,
    refetch: productRefectch,
  } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      productId: Number(productIdQuery),
    },
  });

  const currentProduct = product?.productByProductId;

  const collectionId = product?.productByProductId?.collections?.[0]?.id || "";

  const {
    data: collectionProducts,
    loading: collectionProductsLoading,
    error: collectionProductsError,
    refetch: collectionProductsRefectch,
  } = useQuery(GET_PRODUCTS_BY_COLLECTION_ID, {
    variables: { collectionId: Number(collectionId), start: 0, rows: 3 },
  });

  const content = collectionProducts?.productsBySearchAndCollectionId?.content;

  if (productError) {
    return (
      <ErrorMessage
        errorMessage={productError?.message}
        refetch={productRefectch}
      />
    );
  }

  return (
    <>
      <ProductHeader
        title="Medium pave star hoop hearing"
        onEdit={() => {}}
        onAddToCollection={() => {}}
        onDraftOrder={() => {}}
        onBack={router.back}
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
          associated_prices={currentProduct?.associated_prices}
          description={currentProduct?.description}
          colors={currentProduct?.colour_families}
          tags={[
            {
              title: "Season",
              list: [currentProduct?.season],
            },
            {
              title: "Collections",
              list:
                currentProduct?.collections?.map(
                  (collection: any) => collection.name
                ) || [],
            },
            {
              title: "Keywords",
              list: currentProduct?.keywords || [],
            },
          ]}
          specifications={[
            {
              label: "Made in",
              value: currentProduct?.country_of_origin,
            },
            {
              label: "Style",
              value: currentProduct?.style_number,
            },
            {
              label: "Composition",
              value: currentProduct?.compositions?.join(", "),
            },
            {
              label: "Material",
              value: currentProduct?.materials?.join(", "),
            },
            {
              label: "Measurements",
              value: currentProduct?.measurements?.join(", "),
            },
            {
              label: "Colors",
              value: currentProduct?.colour_name,
            },
            {
              label: "Color Code",
              value: currentProduct?.colour_code,
            },
            {
              label: "Color Family",
              value: currentProduct?.colour_families?.join(", "),
            },
            {
              label: "Delivery start",
              value: currentProduct?.delivery_window_start_date,
            },
            {
              label: "Delivery end",
              value: currentProduct?.delivery_window_start_date,
            },
          ]}
        />
        <div className="flex justify-between mt-[70px] mb-[40px]">
          <h2 className="text-[32px]">From this collection</h2>
          <Link
            href={`/organization/1/discover/collections/${collectionId}`}
            className="flex align-center"
          >
            View More <Icon className="ml-[6px]" name="icon-arrow-right" />
          </Link>
        </div>
        {collectionProductsLoading && <Loading message="Loading collecitons" />}
        {!collectionProductsLoading && (
          <ProductList
            gridType={"grid"}
            products={content || []}
            selectable={false}
            onSelect={() => {}}
            selectedProducts={[]}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
