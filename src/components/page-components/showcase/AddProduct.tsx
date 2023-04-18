import { FC, useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/molecules/Button';
import { Icon } from '@/components/molecules/Icon';
import ProgressBar from '@/components/molecules/ProgressBar';
import SuccessMessageBox from '@/components/molecules/SuccessBox';
import { apiConfig } from '@/utils/apiConfig';
import { FileIngestionResourceApi } from 'client/command';
import { useRouter } from 'next/router';
import Toast from '../Toast';
import { useQuery } from '@apollo/client';
import { ORGANIZATION_QUERY } from '@/queries/organizations';
import { downloadFile } from '@/utils/downloadFile';

export interface AddProductProps {}

const AddProduct: FC<AddProductProps> = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [organizationId, setOrganiationId] = useState<null | number>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    setOrganiationId(Number(router?.query?.id));
  }, [router?.isReady]);

  const { data } = useQuery(ORGANIZATION_QUERY, {
    variables: { organizationId },
  });

  const productCsvGuid = data?.organizationByOrganizationId?.product_csv_guid;

  const handleErrorMesssage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSuccessMesssage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const onDrop = async (files: any) => {
    const acceptedFiles = files?.[0] || {};
    setShowProgress(true);
    try {
      const config = await apiConfig();
      const api = new FileIngestionResourceApi(config);
      if (organizationId) {
        await api.apiIngestionUploadAndImportProductXlsPost(
          organizationId,
          acceptedFiles,
          acceptedFiles?.name,
          {
            onUploadProgress: ({ loaded, total }) => {
              setProgress(Math.round((loaded * 100) / (total || 0)));
              setShowProgress(false);
              setSuccess(true);
              setFile(acceptedFiles);
            },
          }
        );
        handleSuccessMesssage('File uploaded successfully!');
      }
    } catch (error) {
      handleErrorMesssage('Failed to upload file!');
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex flex-col items-center justify-center w-full pt-6 pb-16">
      <div
        className={`w-[500px] min-h-[300px] p-9 flex items-center justify-center border rounded-xl m-10 cursor-pointer ${
          success ? 'border-[#64B980]' : 'border'
        }`}
      >
        {showProgress ? (
          <ProgressBar percentage={progress} />
        ) : !showProgress && success ? (
          <SuccessMessageBox
            placeholder={`Your file ${file?.name} has been uploaded successfully`}
            buttonLabel="Back to products"
          />
        ) : (
          <div className="flex flex-col items-center" {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon
              name="icon-document"
              className="mb-4"
              height={40}
              width={40}
            />
            <p className="leading-10 text-[32px] font-light text-center max-w-xs">
              {isDragActive
                ? 'Drop files here'
                : 'Drag and Drop your CSV file here'}
            </p>
          </div>
        )}
      </div>
      <p className="max-w-[500px] font-light text-center text-[14px] text-[#333333] pb-4">
        In order to upload your product CSV without any issues, please make sure
        you have the correct CSV file format
      </p>
      <div className="pb-[50px] flex flex-col items-center">
        <h2 className="text-[18px] pb-8 text-[#333333] font-normal leading-6">
          Our latest CSV file format can be found here.
        </h2>
        <Button
          variant="outlined"
          className="h-[40px] w-[352px] !m-0"
          size="sm"
          as='a'
          href='https://storage.googleapis.com/born-files-dev/template/RBW%20-%20Product%20Ingestion%20Template.xlsx'
          download
        >
          <Icon name="icon-document" /> Download CSV template
        </Button>
      </div>
      <div className="pb-[50px] flex flex-col items-center">
        <h2 className="text-[18px] pb-8 text-[#333333] font-normal leading-6">
          Further documentation about ingestion practices.
        </h2>
        <Button
          variant="outlined"
          className="h-[40px] w-[352px] !m-0"
          size="sm"
          onClick={() => {
            const win = window.open(
              'https://equatorial-mask-ab1.notion.site/BORN-Onboarding-Process-70fa777541b84fe7a2ad879a69d42a5a',
              '_blank'
            );
            if (win != null) {
              win.focus();
            }
          }}
        >
          <Icon name="icon-book" /> Ingestion resources
        </Button>
      </div>
      <div className="pb-[50px] flex flex-col items-center">
        <h2 className="text-[18px] pb-8 text-[#333333] font-normal leading-6">
          Care to work on your existing product data?
        </h2>
        <Button
          variant="outlined"
          className="h-[40px] w-[352px] !m-0"
          size="sm"
          as='a'
          href='https://storage.googleapis.com/born-files-dev/product-csv/09424fb7-ce8e-4754-ac3d-b7fe0cd17545_RU1QT1JJTyBTSVJFTlVTRQ%3D%3D.xlsx'
          download
        >
          <Icon name="icon-document" /> Download product inventory CSV
        </Button>
      </div>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default AddProduct;
