import { FC, useEffect, useState } from 'react';
import { ProductWithCollectionsGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '../Toast';
import ImageUpload from '@/assets/svgs/image.svg';
import { Icon } from '@/components/molecules/Icon';
import { AttachmentResourceApi } from 'client/command';
import { useRouter } from 'next/router';
import Loading from '../Loading';
import DraggableCards from '@/components/organisms/DraggableCards';
import SortableItem from '@/components/organisms/DraggableCards/SortableItem';

interface MediaFormProps {
  product: ProductWithCollectionsGraphqlDto;
  refetch: () => void;
  loading?: boolean;
}

const MediaForm: FC<MediaFormProps> = ({ product, refetch, loading }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMesage] = useState('');

  const router = useRouter();
  const organizationId = Number(router?.query?.id);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    try {
      const config = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUploadProductImagesPost(
        organizationId,
        product?.id,
        files
      );
      setSuccessMessage('Product Images uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setTimeout(async () => {
        await refetch();
        setIsUploading(false);
      }, 5000);
    } catch (error) {
      setIsUploading(false);
      setErrorMesage('Failed to upload product images!');
      setTimeout(() => setErrorMesage(''), 3000);
      console.error(error);
    }
  };

  const handleDeleteAttachment = async (id: number) => {
    setIsSubmitted(true);
    try {
      const config = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentDeleteProductImageDelete(id);
      await refetch();
      setIsSubmitted(false);
      setSuccessMessage('Product image deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setIsSubmitted(false);
      setErrorMesage('Failed to delete product image!');
      setTimeout(() => setErrorMesage(''), 3000);
      console.error(error);
    }
  };

  const handleFileChange = (e: any) => {
    const files: any = e?.target?.files || [];
    const filesArr: File[] = Array.from(files)?.map((item: any) => item) || [];
    handleUpload(filesArr);
  };

  const handleDragItems = async (items: { [key: string]: number; }) => {
    setIsSubmitted(true);
    try {
      const config = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUpdateProductAttachmentPositionsPut(product?.id, items);
      await refetch();
      setIsSubmitted(false);
      setSuccessMessage('Image position changed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setIsSubmitted(false);
      setErrorMesage('Failed to change image position!');
      setTimeout(() => setErrorMesage(''), 3000);
      console.error(error);
    }
  };

  const renderImage = (item: any) => (
    <div key={item?.id} className="h-[352px] w-[352px] p-6 bg-shades-white">
      <div className="relative flex flex-col justify-center items-center w-full h-full rounded bg-neutral-200">
        {item?.medium_image_url && (
          <>
            <img
              src={item.medium_image_url}
              alt="File"
              className="object-cover w-full h-full rounded"
            />
            <Button
              size="sm"
              color="white"
              className="absolute bottom-6 right-6 !text-[12px] !font-light hover:!bg-shades-black hover:!text-shades-white"
              onClick={() => handleDeleteAttachment(item?.id)}
              disabled={isSubmitted}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );

  if (loading || isUploading) {
    return (
      <Loading
        message={
          loading
            ? 'Loading attachments'
            : 'It will take a few seconds to upload images...'
        }
      />
    );
  }

  return (
    <div className="max-w-[1119px]">
      <DraggableCards
        list={product?.attachments || []}
        onDragEnd={(items) => handleDragItems?.(items)}
        renderChilds={(items: any) => (
          <div className="flex flex-wrap gap-4">
            {items?.map((item: any) => (
              <SortableItem key={item?.id} id={item?.id}>
                {renderImage(item)}
              </SortableItem>
            ))}
          </div>
        )}
        activeElement={(item: any) => renderImage(item)}
      />
      <div>
        <div className="media inline-flex">
          <Button
            variant="link"
            className="relative !bg-shades-white !text-shades-black"
          >
            <input
              type="file"
              multiple
              className="absolute w-full h-full left-0 top-0 opacity-0"
              onChange={handleFileChange}
              accept="image/png, image/gif, image/jpeg"
            />
            <Icon name="icon-add" /> Add Media
          </Button>
        </div>
      </div>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default MediaForm;
