import { Button } from '@/components/molecules/Button';
import Input from '@/components/molecules/Inputs/Input';
import Modal from '@/components/molecules/Modal';
import { FC, useState } from 'react';
import FileType from './FileType';

interface LinesheetUploadProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: ({
    fileType,
    name,
    file,
  }: {
    fileType: 'LOOKBOOK' | 'LINESHEET' | null;
    name: string;
    file: File | null;
    onReset: () => void;
  }) => void;
}

const LinesheetUpload: FC<LinesheetUploadProps> = ({
  isOpen,
  setIsOpen,
  handleSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileType, setFileType] = useState<'LOOKBOOK' | 'LINESHEET' | null>(
    null
  );
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const handleReset = () => {
    setFileType(null);
    setName('');
    setFile(null);
    setIsSubmitting(false);
  };
  return (
    <div>
      <Modal
        className="max-w-[736px] overflow-hidden"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setFileType(null);
        }}
        title="Choose a file type"
      >
        {!fileType && (
          <FileType
            onClick={(fileType, value) => {
              setFileType(fileType);
              setFile(value);
            }}
          />
        )}
        {fileType && (
          <>
            <Input
              label={fileType === 'LINESHEET' ? 'Linesheet' : 'Lookbook'}
              value={name}
              isRequired
              onChange={(e) => setName(e)}
            />
            <Button
              disabled={isSubmitting}
              onClick={() =>
                {
                  handleSubmit({ fileType, name, file, onReset: handleReset })
                  setIsSubmitting(true);
                }
              }
            >
              Save
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default LinesheetUpload;
