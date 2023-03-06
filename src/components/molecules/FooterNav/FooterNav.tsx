import Link from "next/link";
import { FC } from "react";

export interface FooterNavProps {
	nav: { name: string; url: string; }[];
};

const FooterNav: FC<FooterNavProps> = ({ nav }) => {
	return (
		<div>
			<div className="justify-center bg-shades-black flex w-full font-normal leading-4 font-sans tracking-[.06em] m-auto h-[72px] items-center text-shades-white flex-col sm:flex-row">
				{nav.map((item, index) => (
					<Link href={item.url} key={index} className="text-[11px] cursor-pointer m-4">
						{item.name}
					</Link>
				))}
			</div>
		</div>
	);
}

export default FooterNav;
