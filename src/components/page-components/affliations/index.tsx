import { Paragraph } from '@/components/molecules/Paragraph';
import BrandTable from '@/components/organisms/Tables/Brand';
import { brands } from '@/components/organisms/Tables/Brand/data';

const Affliations = () => {
  return (
    <div>
      <Paragraph size="xl" className="!text-shades-black !-light">
        Switch account between your different organizations.
      </Paragraph>
      <div className="mt-4">
        <BrandTable brands={brands} />
      </div>
    </div>
  );
};

export default Affliations;
