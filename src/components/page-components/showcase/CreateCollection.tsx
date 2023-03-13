import { ChangeEvent, FC, useState } from 'react';
import Input from '@/components/molecules/Inputs';
import { Button } from '@/components/molecules/Button';
import Toast from '../Toast';

interface CreateCollectionProps {
  handleSubmit?: (collectionName: { name: string; description: string; }) => void;
}

const CreateCollection: FC<CreateCollectionProps> = ({ handleSubmit }) => {
  const [collectionName, setCollectionName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <div>
      <Input
        value={collectionName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCollectionName(e.target.value)
        }
        label="Collection name"
      />
      <Button
        size="lg"
        className="max-w-[124px] mt-8"
        onClick={() => {
          if (!collectionName) {
            setErrorMessage('Collection name is required!');
            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
            return;
          }

          handleSubmit &&
            handleSubmit({ name: collectionName, description: '' });
        }}
      >
        Save
      </Button>
      {errorMessage && <Toast errorMessage={errorMessage} />}
    </div>
  );
};

export default CreateCollection;
