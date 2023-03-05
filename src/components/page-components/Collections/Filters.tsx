import { Button } from "@/components/molecules/Button";
import { GridType, IconButtonGroup } from "@/components/molecules/IconButtonGroup";
import { SearchInput } from "@/components/molecules/SearchInput";
import { TagCollection } from "@/components/molecules/TagCollection";
import { ChangeEvent, FC, useState } from "react";

interface FiltersProps {
  onGridChange: (grid: GridType) => void;
  gridType: GridType,
  onSelect: () => void;
}

const Filters: FC<FiltersProps> = ({
  gridType,
  onGridChange,
  onSelect,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const tagCollection = [
    {
      label: "Colours",
      size: "default",
      type: "default",
    },
    {
      label: "Season",
      size: "default",
      type: "default",
    },
  ]

  return (
    <div className="mt-[64px] flex items-center justify-between">
      <div className="flex items-center">
        <SearchInput
          value={searchKeyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
          onClear={() => setSearchKeyword('')}
          onEnter={function noRefCheck() {}}
          placeholder="Search"
          className="mr-2"
        />
        <TagCollection
          tags={tagCollection}
        />
      </div>
      <div className="flex items-center">
        <div className="pr-4 mr-4 border-r border-neutral-400">
          <Button variant="outlined" size="sm" onClick={onSelect}>Select</Button>
        </div>
        <div>
          <IconButtonGroup value={gridType} handleChange={onGridChange} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
