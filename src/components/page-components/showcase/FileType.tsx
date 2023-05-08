import { FC, useRef } from 'react';
import { Button } from '@/components/molecules/Button';
import { Icon } from '@/components/molecules/Icon';

interface FileTypeProps {
  onClick: (type: 'LOOKBOOK' | 'LINESHEET', file: File) => void;
}

const FileType: FC<FileTypeProps> = ({ onClick }) => {
  const handleFileChange = (event: any, type: 'LOOKBOOK' | 'LINESHEET') => {
    const file: File = event.target.files[0];
    onClick(type, file)
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8">
      <Button
        variant="outlined"
        className="relative h-[56px] !max-w-[264px] !m-0"
        size="lg"
      >
        <input
          type="file"
          className="cursor-pointer opacity-0 absolute top-0 left-0 w-full h-full z-[2]"
          onChange={(e) => handleFileChange(e, 'LOOKBOOK')}
        />
        <Icon name="icon-book" className="cursor-pointer" /> Upload lookbook
      </Button>
      <Button
        variant="outlined"
        className="relative h-[56px] !max-w-[264px] !m-0"
        size="lg"
      >
        <input
          type="file"
          className="cursor-pointer opacity-0 absolute top-0 left-0 w-full h-full z-[2]"
          onChange={(e) => handleFileChange(e, 'LINESHEET')}
        />
        <Icon name="icon-document" className="cursor-pointer" /> Upload
        linesheet
      </Button>
    </div>
  );
};

export default FileType;
