import { Pill } from "@/components/atoms/Pill";
import { FileUpload } from "@/components/molecules/FileUpload";
import React, { useState } from "react";

const Marketing = () => {
	const collections = [{ label: "SS23" }, { label: "Pre-spring 2023" }];
	return (
		<div>
			<p className="text-shades-black leading-8 text-[18px] mb-4">
				Add your brand&#8217;s linesheet and lookbook to your profile,
				or add them to a <br></br> specific collection.
			</p>
			<h2 className="mb-6 text-[24px] leading-10 font-light">
				Brand Profile
			</h2>
			<FileUpload
				acceptedFileTypes={["application/pdf"]}
				labelText="Lookbook | PDF only (25 MB max)"
				className="mb-8"
			/>
			<h2 className="text-[24px] leading-10 font-light">Collections</h2>
			<p className="text-shades-black leading-8 text-[18px] mb-6">
				Choose a collection, and upload the desired content.
			</p>
			<div className="mb-6">
				{collections?.length > 0 &&
					collections.map((collection, index) => {
						return (
							<Pill
								label={collection.label}
								key={`${index} collection`}
								isSelectable={true}
								className="mr-4"
							/>
						);
					})}
			</div>
			<FileUpload
				acceptedFileTypes={["application/pdf"]}
				labelText="Lookbook | PDF only (25 MB max)"
				className="mb-8"
			/>
		</div>
	);
};

export default Marketing;
