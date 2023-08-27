import React, { FC, useState } from "react";
import { Icon } from "@/components/molecules/Icon";
import ImageText from "@/components/molecules/ImageText";
import LogoImage from "@/assets/images/logo-image.png";
import { Button } from "@/components/molecules/Button";
import clsx from "clsx";
import styles from "./ProductHeaderProps.module.css";
import Link from "next/link";
import Modal from "@/components/molecules/Modal";
import CreateCollection from "@/components/page-components/showcase/CreateCollection";
import AddCollections from "@/components/page-components/showcase/AddCollections";
import { apiConfig } from "@/utils/apiConfig";
import { CollectionResourceApi } from "client/command";
import { useRouter } from "next/router";
import Toast from "@/components/page-components/Toast";
import { ProductWithCollectionsGraphqlDto } from "@/generated/types";

export interface ProductHeaderProps {
  title?: string;
  srcBlurDataURL?: string;
  onEdit?: () => void;
  onDraftOrder: () => void;
  containerClassName?: string;
  hrefBack?: string;
  currentProduct: ProductWithCollectionsGraphqlDto | null;
  productRefectch: () => void;
  children?: any;
}

const ProductHeader: FC<ProductHeaderProps> = ({
  onDraftOrder,
  containerClassName,
  currentProduct,
  productRefectch,
  children
}) => {
  const [isAddCollections, setIsAddCollections] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorMesssage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleSuccessMesssage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const router = useRouter();
  const id = router?.query?.id || "";
  const organizationId: number = +id;
  const productId: number | null = Number(router?.query?.product_id) || null;

  const handleAddToCollection = async (collectionId: any) => {
    if (currentProduct?.id) {
      try {
        const config: any = await apiConfig();
        const api = new CollectionResourceApi(config);
        await api.apiCollectionAssociateProductsPut(collectionId, [
          currentProduct.id,
        ]);
        productRefectch();
        handleSuccessMesssage(`Added 1 product to collections sucessfully!!`);
        setIsAddCollections(false);
        setIsCreateModal(false);
      } catch (error: any) {
        handleErrorMesssage(
          error?.message || "Something went wrong, please try again!"
        );
        console.error(error);
      }
    }
  };

  const handleAddCollections = async (newCollection: any) => {
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      await api.apiCollectionCreateNewCollectionPost(
        organizationId,
        newCollection
      );
      setIsCreateModal(false);
      handleSuccessMesssage("New collection added successfully!");
    } catch (error) {
      handleErrorMesssage("Faild to add new collection!");
      console.error(error);
    }
  };

  const back = () => {
    const { pathname, query } = router
    delete router.query.product_id;
    router.replace({ pathname, query }, undefined, { shallow: true })
  }

  return (
    <>
      <div className={clsx("sticky top-0 z-[10] bg-shades-white mx-auto p-6", containerClassName)}>
        <div className="flex items-center justify-between">
          {!children ? <div className="cursor-pointer" onClick={() => back()}>
            <Icon className="mt-[12px] mr-[26px]" name="icon-arrow-left" height={32} width={32} />
          </div> : <div />}
          <div className="flex items-center">
            <Button
              onClick={() => router.push(`/organization/${organizationId}/discover/products/${productId}/edit`)}
              className={clsx(styles.toolButton, '!px-3 !text-[12px]')}
              variant="outlined"
              size="sm"
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsAddCollections(true)}
              className={clsx(styles.toolButton, styles.addToCollection, '!px-3 !text-[12px]')}
              variant="outlined"
              size="sm"
            >
              Add to collection
            </Button>
            <Button onClick={onDraftOrder} className={clsx(styles.toolButton, '!px-3 !text-[12px]')} size="sm">
              Add to draft order
            </Button>
            {children}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isAddCollections}
        onClose={() => {
          setIsAddCollections(false);
          setIsCreateModal(false);
        }}
        title={isCreateModal ? "Name this collection" : "Choose collections"}
        className="!max-h-[417px] !max-w-[736px] overflow-x-hidden overflow-y-auto"
      >
        {isCreateModal ? (
          <CreateCollection
            handleSubmit={(newCollection) => {
              handleAddCollections(newCollection);
            }}
          />
        ) : (
          <AddCollections
            isSelect
            onAddCollection={() => {
              setIsCreateModal(true);
            }}
            onSelect={(id) => handleAddToCollection(id)}
          />
        )}
      </Modal>

      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </>
  );
};

export default ProductHeader;
