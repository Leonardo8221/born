import { FC, useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/molecules/Button';
import { Icon } from '@/components/molecules/Icon';
import ProgressBar from '@/components/molecules/ProgressBar';
import SuccessMessageBox from '@/components/molecules/SuccessBox';

export interface AddProductProps {}

const AddProduct: FC<AddProductProps> = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [success, setSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    setShowProgress(true);

    if (typeof acceptedFiles === 'object') {
      console.log('files', acceptedFiles);
    }

    // Code to execute after a delay of 3 seconds
    const delayedCode = () => {
      setShowProgress(false);
      setSuccess(true);
    };

    setTimeout(delayedCode, 3000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex flex-col items-center justify-center w-full pt-6 pb-16">
      <div
        className={`w-[500px] min-h-[300px] p-9 flex items-center justify-center border rounded-xl m-10 cursor-pointer ${
          success ? 'border-[#64B980]' : 'border'
        }`}
      >
        {showProgress ? (
          <ProgressBar percentage={50} />
        ) : !showProgress && success ? (
          <SuccessMessageBox
            placeholder="Your file ‘filename.excel’ has been uploaded successfully"
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
        >
          <Icon name="icon-document" /> Download product inventory CSV
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
