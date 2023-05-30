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
  srcLogo?: string;
  title?: string;
  srcBlurDataURL?: string;
  onEdit?: () => void;
  onDraftOrder: () => void;
  containerClassName?: string;
  hrefBack?: string;
  currentProduct: ProductWithCollectionsGraphqlDto | null;
  productRefectch: () => void;
}

const ProductHeader: FC<ProductHeaderProps> = ({
  title,
  srcLogo,
  srcBlurDataURL,
  // onEdit,
  onDraftOrder,
  hrefBack = "/",
  containerClassName,
  currentProduct,
  productRefectch,
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

  return (
    <>
      <div className={clsx("w-[1300px] mx-auto", containerClassName)}>
        <div className="flex items-center">
          <Link href={hrefBack}>
            <Icon className="mt-[12px] mr-[26px]" name="icon-arrow-left" />
          </Link>
          <div className="mr-auto">
            <ImageText
              title={title || ""}
              titleClassName="text-[32px] max-w-[700px] !leading-[32px] pr-[15px]"
              imgSrc={srcLogo}
              hideOverlay
              altText=" "
            />
          </div>
          <Button
            onClick={() => router.push(`${router.asPath}/edit`)}
            className={styles.toolButton}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={() => setIsAddCollections(true)}
            className={clsx(styles.toolButton, styles.addToCollection)}
            variant="outlined"
          >
            Add to collection
          </Button>
          <Button onClick={onDraftOrder} className={styles.toolButton}>
            <Icon name="icon-add" />
            Add to draft order
          </Button>
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
