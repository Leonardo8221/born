import React, { useState } from 'react';
import clsx from 'clsx';
import ImageText from '../../molecules/ImageText';
import { Button } from '../../molecules/Button';
import ProductImage from '../../../assets/images/product-image.png';
import { ReactComponent as PlusIcon } from '../../../assets/svgs/plus.svg';
import { fonts } from '../../../config/fonts';
import Modal from '../../molecules/Modal';

const CollectionSelectionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const collections = [
    {
      title: 'Spring summer',
      url: ProductImage,
    },
    {
      title: 'Winter',
      url: ProductImage,
    }
  ];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Choose Collection</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Collection Selection">
        <div className='flex flex-col gap-y-6'>
          <div className='flex items-center gap-x-4'>
            <div className='flex h-[80px] w-[80px] cursor-pointer items-center justify-center bg-neutral-100 border border-neutral-400 rounded'>
              <PlusIcon />
            </div>
            <h3 className={clsx(fonts.text.xl, 'text-shades-black tracking-[0.06em]')}>New collection</h3>
          </div>

          {collections.map(collection => (
            <ImageText title={collection.title} imgSrc={collection.url} variant="product" />
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default CollectionSelectionModal;
