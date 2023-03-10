import { FC } from "react";
import { Button } from "@/components/molecules/Button";
import { Icon } from "@/components/molecules/Icon";

interface FileTypeProps {
  onClick: (type: "lookbook" | "linesheet") => void;
}

const FileType: FC<FileTypeProps> = ({ onClick }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8">
      <Button
        variant="outlined"
        className="h-[56px] !max-w-[264px] !m-0"
        size="lg"
        onClick={() => onClick("lookbook")}
      >
        <Icon name="icon-book" /> Upload lookbook
      </Button>
      <Button
        variant="outlined"
        className="h-[56px] !max-w-[264px] !m-0"
        size="lg"
        onClick={() => onClick("linesheet")}
      >
        <Icon name="icon-document" /> Upload linesheet
      </Button>
    </div>
  );
};

export default FileType;
