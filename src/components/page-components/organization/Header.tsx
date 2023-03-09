import { Icon } from "@/components/molecules/Icon";

export const Header = () => {
  return (
    <div className="h-[72px] w-full max-w-[1440px] flex mx-auto items-center justify-end px-8">
      <div className="cursor-pointer w-10 h-10 flex items-center justify-center">
        <Icon name="icon-close" className="text-shades-black mx-auto" height={20} width={20} />
      </div>
    </div>
  )
}

export default Header;
