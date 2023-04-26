import { FC, useEffect, useState } from 'react';
import {
  ProductWithCollectionsGraphqlDto,
} from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '../Toast';
import ImageUpload from '@/assets/svgs/image.svg';
import { Icon } from '@/components/molecules/Icon';
import { AttachmentResourceApi } from 'client/command';
import { useRouter } from 'next/router';
import Loading from '../Loading';

interface MediaFormProps {
  product: ProductWithCollectionsGraphqlDto;
  refetch: () => void;
}

const MediaForm: FC<MediaFormProps> = ({ product, refetch }) => {
  const [attachments, setAttachments] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMesage] = useState('');
  const [id, setId] = useState<number | null>(null);

  const router = useRouter();
  const organizationId = Number(router?.query?.id);

  useEffect(() => {
    setAttachments(product?.attachments || []);
  }, [product]);

  const handleUpload = async (e: any, index: number) => {
    e.preventDefault();
    const file = e.target.files[0];
    setId(index);
    setIsSubmitted(true);
    try {
      const config = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUploadProductImagePost(
        organizationId,
        product?.id,
        file,
        file.name
      );
      setTimeout(async() => {
        await refetch();
        setIsSubmitted(false);
      }, 3000);
      setId(null);
      setSuccessMessage('Product Image uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setIsSubmitted(false);
      setErrorMesage('Failed to upload product image!');
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

  return (
    <div className="max-w-[1119px]">
      <div className="flex flex-wrap gap-4">
        {attachments?.map((item, index) => (
          <div
            key={item?.id}
            className="h-[352px] w-[352px] p-6 bg-shades-white"
          >
            <div className="relative flex flex-col justify-center items-center w-full h-full rounded bg-neutral-200">
              {item?.medium_image_url ? (
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
              ) : (
                <>
                  <input
                    type="file"
                    className="cursor-pointer opacity-0 absolute left-0 top-0 w-full h-full z-10"
                    onChange={(e) => handleUpload(e, index)}
                    disabled={isSubmitted}
                  />
                  {(isSubmitted && id === index) ? (
                    <Loading message="Uploading..." />
                  ) : (
                    <div>
                      <ImageUpload
                        height={32}
                        width={32}
                        className="mx-auto mb-6"
                      />
                      <Button
                        size="sm"
                        variant="outlined"
                        className="!border-[#999999] !text-[12px] !font-light"
                      >
                        Upload
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="inline-flex">
          <Button
            variant="link"
            className="!bg-shades-white !text-shades-black"
            onClick={() =>
              setAttachments([
                ...attachments,
                { id: new Date(), medium_image_url: '' },
              ])
            }
          >
            <Icon name="icon-add" /> Add Media
          </Button>
        </div>
      </div>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default MediaForm;
