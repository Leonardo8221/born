import { useState } from 'react';

type SelectedVariant = {
  id: number;
  selectedVariant: number;
  isVariant?: boolean;
  isNew?: boolean;
};

const useVariantSelect = (initialState: SelectedVariant[] = []) => {
  const [selectedVariants, setSelectedVariants] =
    useState<SelectedVariant[]>(initialState);

  const resetSelectedRows = () => {
    setSelectedVariants([]);
  };

  const handleSelectedVariants = ({
    id,
    selectedVariant,
    isVariant,
    isNew,
  }: SelectedVariant) => {
    if (isVariant) {
      const updatedVariants = [...selectedVariants];
      const index = updatedVariants.findIndex((variant) => variant.id === id);
      if (index < 0) {
        return;
      } else {
        const selectedItem = updatedVariants[index];
        selectedItem.selectedVariant = selectedVariant;
        updatedVariants[index] = selectedItem;
        setSelectedVariants(updatedVariants);
      }
    } else {
      if(isNew) {
        setSelectedVariants([{ id, selectedVariant: id }]);
      } else {
        const updatedVariants = [...selectedVariants];
        const selectedItems = selectedVariants.map((variant) => variant.id);
        if (selectedItems.includes(id)) {
          setSelectedVariants(
            updatedVariants.filter((variant) => variant.id !== id)
          );
        } else {
          setSelectedVariants([...selectedVariants, { id, selectedVariant }]);
        }
      }
    }
  };

  const selectedRows = selectedVariants.map((variant) => variant.id);
  const selectedVariantsArr = selectedVariants.map((variant) => variant.selectedVariant);

  return {
    selectedRows,
    selectedVariants: selectedVariantsArr,
    setSelectedRows: handleSelectedVariants,
    resetSelectedRows,
    setSelectedVariants,
  };
};

export default useVariantSelect;
