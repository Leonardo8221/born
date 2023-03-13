import { ChangeEvent, FC, useState } from 'react';
import Input from '@/components/molecules/Inputs';
import { Button } from '@/components/molecules/Button';

interface CreateCollectionProps {
  handleSubmit?: (e: any) => void;
}

const CreateCollection: FC<CreateCollectionProps> = ({ handleSubmit }) => {
  const [collectionName, setCollectionName] = useState('');
  return (
    <div>
      <Input
        value={collectionName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCollectionName(e.target.value)
        }
        label="Collection name"
      />
      <Button size="lg" className="max-w-[124px] mt-8" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default CreateCollection;
