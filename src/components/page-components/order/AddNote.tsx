import React from 'react';
import Modal from '@/components/molecules/Modal';
import DescriptionField from '@/components/molecules/DescriptionField/DescriptionField';
import { Button } from '@/components/molecules/Button';

interface AddNoteProps {
  isOpen: boolean;
  handleChange: (val: string) => void;
  handleSaveNote: () => void;
  onClose: () => void;
  note: string;
}

export default function AddNote({
  isOpen = false,
  note,
  handleChange,
  handleSaveNote,
  onClose,
}: AddNoteProps) {
  return (
    <Modal
      onClose={onClose}
      title="Add a order note"
      className="!w-1/2"
      isOpen={isOpen}
    >
      <div>
        <DescriptionField
          onChange={handleChange}
          value={note}
          className="mb-8"
          label="Order Note"
          placeholder="This Order...."
        />
        <Button label="Save" onClick={handleSaveNote} />
      </div>
    </Modal>
  );
}
