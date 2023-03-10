import { FileUpload } from "@/components/molecules/FileUpload";
import Modal from "@/components/molecules/Modal";
import { Button } from "@/components/molecules/Button";
const ShowcasePage = () => {
  return (
    <Modal title="Product Ingestion Tool" isOpen={true}>
      <div className=" px-[90px] flex flex-col items-center">
        <div className="py-10">
          <FileUpload />
        </div>
        <p className="text-center text-[14px] text-[#666666]">
          In order to upload your product CSV without any issues, please make
          sure you have the correct CSV file format
        </p>
        <div className="py-2">
          <h2 className="text-[18px] py-5">
            Our latest CSV file format can be found here.
          </h2>
          <Button variant="outlined" label="Ingestion resources" />
        </div>
        <div className="py-2">
          <h2 className="text-[18px] py-5">
            Care to work on your existing product data?
          </h2>
          <Button variant="outlined" label="Download product inventary CSV" />
        </div>
        <div className="py-2">
          <h2 className="text-[18px] py-5">
            Further documentation about ingestion practices.
          </h2>
          <Button variant="outlined" label="Download CSV template" />
        </div>
      </div>
    </Modal>
  );
};

export default ShowcasePage;
