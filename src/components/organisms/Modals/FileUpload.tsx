import { useState } from 'react';
import { Button } from '@/components/molecules/Button';
import { Icon } from '@/components/molecules/Icon';
import Modal from '@/components/molecules/Modal';

const FileUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Upload file</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Choose a file type">
        <div className='flex flex-wrap items-center justify-center gap-x-8'>
          <Button
            variant="outlined"
            className="h-[56px] !max-w-[264px] !m-0"
            size="lg"
          >
            <Icon name="icon-book" /> Upload lookbook
          </Button>
          <Button
            variant="outlined"
            className="h-[56px] !max-w-[264px] !m-0"
            size="lg"
          >
            <Icon name="icon-document" /> Upload linesheet
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default FileUpload;
