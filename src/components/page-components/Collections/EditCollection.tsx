import { Button } from '@/components/molecules/Button';
import { FileUpload } from '@/components/molecules/FileUpload';
import Input from '@/components/molecules/Inputs/Input';
import Modal from '@/components/molecules/Modal';
import { CollectionGraphqlDto } from '@/generated/types';
import { apiConfig } from '@/utils/apiConfig';
import { AttachmentResourceApi, CollectionResourceApi } from 'client/command';
import { FC, useEffect, useState } from 'react';

interface EditCollectionProps {
  isOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
  title: string;
  collection: CollectionGraphqlDto;
  handleSuccessMessage: (message: string) => void;
  handleErrorMessage: (message: string) => void;
  refetch?: () => void;
}

const EditCollection: FC<EditCollectionProps> = ({
  isOpen,
  toggleModal,
  title,
  collection,
  handleSuccessMessage,
  handleErrorMessage,
  refetch,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(collection?.name || '');
    setDescription(collection?.description || '');
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const config = await apiConfig();
      const api = new CollectionResourceApi(config);
      await api.apiCollectionUpdateCollectionDetailsPut(collection?.id, {
        name,
        description,
      });
      toggleModal(false);
      setIsSubmitting(false);
      refetch?.()
      handleSuccessMessage('Collection updated successfully!');
    } catch (error: any) {
      setIsSubmitting(false);
      handleErrorMessage(error?.message || 'Failed to update collection!');
      console.error(error);
    }
  };

  const handleUpload = async (file: File) => {
    setIsSubmitting(true);
    try {
      const config = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUploadCollectionAttachmentPost(collection?.id, 'BANNER', file, file.name);
      setIsSubmitting(false);
      handleSuccessMessage('Banner image uploaded successfully!');
    } catch (error: any) {
      setIsSubmitting(false);
      handleErrorMessage(error?.message || 'Failed to upload banner image!')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      className="max-w-[736px] mx-auto"
      onClose={() => toggleModal(false)}
    >
      <div>
        <div>
          <Input label="Collection name" value={name} onChange={setName} />
        </div>
        <div>
          <Input
            label="Collection description"
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="max-w-[352px] mx-auto mt-[38px]">
          <FileUpload
            idInput='collectionBannerImage'
            labelText="Banner image"
            imageUrl={collection?.banner_url || ''}
            disabled={isSubmitting}
            handleUpload={handleUpload}
          />
        </div>

        <div className="mt-8">
          <Button
            className="!h-10 !max-w-[124px] !mx-auto"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCollection;
