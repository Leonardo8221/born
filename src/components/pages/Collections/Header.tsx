import { Button } from "@/components/molecules/Button";
import { DropdownMenu } from "@/components/molecules/DropdownMenu";
import { Icon } from "@/components/molecules/Icon";
import { IconButton } from "@/components/molecules/IconButton";

const Header = () => {
  const items = [
    {
      label: 'PDF',
      value: 'pdf',
      action: () => console.log('PDF downloaded!'),
    },
    {
      label: 'Excel',
      value: 'excel',
      action: () => console.log('Excel downloaded!'),
    }
  ]
  return (
    <div className="flex items-center justify-between">
      <div>
        <IconButton size="md" icon={<Icon name="icon-arrow-left" />} />
      </div>
      <div className="flex items-center gap-x-4">
        <Button variant="outlined">Edit</Button>
        <DropdownMenu options={items} variant="button" />
        <Button className="px-[35px]">
          <Icon name="icon-add" /> Create order
        </Button>
      </div>
    </div>
  )
}

export default Header;
