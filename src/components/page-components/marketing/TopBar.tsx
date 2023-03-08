import { Icon } from "@/components/molecules/Icon";
import Link from "next/link";
import React, { FC } from "react";

export interface TopBarProps {
	hrefBack: string;
	hrefClose: string;
}

const TopBar: FC<TopBarProps> = ({ hrefBack, hrefClose }) => {
	return (
		<div className="flex justify-between items-center bg-white w-[100%] px-[39px] py-[26px]">
			<Link href={hrefBack}>
				<Icon className="mt-[12px]" name="icon-arrow-left" />
			</Link>
			<Link href={hrefClose}>
				<Icon name="icon-close" />
			</Link>
		</div>
	);
};

export default TopBar;
