import { ChangeEvent, FC, useState } from "react";
import { TagProps } from "@/components/atoms/Tag";
import { Button } from "@/components/molecules/Button";
import { GridType, IconButtonGroup } from "@/components/molecules/IconButtonGroup";
import { SearchInput } from "@/components/molecules/SearchInput";
import { TagCollection } from "@/components/molecules/TagCollection";

type Action = {
  name: string;
  action: (e: any) => void;
}

interface FiltersProps {
  onGridChange: (grid: GridType) => void;
  gridType: GridType,
  onSelect: () => void;
  filterTags: TagProps[];
  actions?: Action[]
}

const Filters: FC<FiltersProps> = ({
  gridType,
  onGridChange,
  onSelect,
  filterTags,
  actions,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');

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
          tags={filterTags}
        />
      </div>
      <div className="flex items-center">
        <div className="flex gap-2 items-center pr-4 mr-4 border-r border-neutral-400">
          <Button
            variant="outlined"
            size="sm"
            onClick={onSelect}
            className="!inline-flex !max-w-auto !w-auto !border-neutral-600 text-shades-black !text-[12px] !px-3"
          >
            Select
          </Button>
          {actions?.map(item => (
            <Button
              key={item.name}
              variant="outlined"
              size="sm"
              onClick={item.action}
              className="!inline-flex !max-w-auto !w-auto !border-neutral-600 text-shades-black !text-[12px] !px-3"
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div>
          <IconButtonGroup value={gridType} handleChange={onGridChange} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
