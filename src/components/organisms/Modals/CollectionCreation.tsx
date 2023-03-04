import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/molecules/Button';
import Input from '@/components/molecules/Inputs';
import Modal from '@/components/molecules/Modal';

const CollectionCreationModal = () => {
  const [collectionName, setCollectionName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Name this Collection</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Name this collection">
        <form>
          <Input
            value={collectionName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCollectionName(e.target.value)}
            label="Collection name"
          />
          <Button size="lg" className="max-w-[124px] mt-8">Save</Button>
        </form>
      </Modal>
    </div>
  );
}

export default CollectionCreationModal;
