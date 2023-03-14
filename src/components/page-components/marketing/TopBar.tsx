import { Icon } from "@/components/molecules/Icon";
import Link from "next/link";
import React, { FC } from "react";

export interface TopBarProps {
	onBack: () => void;
	onClose: () => void;
}

const TopBar: FC<TopBarProps> = ({ onBack, onClose }) => {
	return (
		<div className="flex justify-between items-center bg-white w-[100%] px-[39px] py-[26px]">
				<Icon onClick={onBack} className="mt-[12px]" name="icon-arrow-left" />
				<Icon onClick={onClose} name="icon-close" />
		</div>
	);
};

export default TopBar;
