import React from "react";
import { SearchInput } from "../../molecules/SearchInput";
import { TagCollection } from "../../molecules/TagCollection";
import OrderListTable from "../../organisms/Tables/OrderList";
import { Button } from "../../molecules/Button";

export const Draft = ({ orders }) => {
    return (
        <div>
            <div id="header" className="flex justify-between">
                <div className="flex items-center mb-[25px]">
                    <SearchInput
                        onChange={() => { }}
                        onClear={function noRefCheck() { }}
                        onEnter={function noRefCheck() { }}
                        placeholder="Search"
                        className="mr-2"
                    />
                    <TagCollection
                        tags={[
                            {
                                label: "Retailers",
                                size: "default",
                                type: "default",
                            },
                            {
                                label: "Buyer",
                                size: "default",
                                type: "default",
                            },
                            {
                                label: "Season",
                                size: "default",
                                type: "default",
                            },
                            {
                                label: "Status",
                                size: "default",
                                type: "default",
                            },
                            {
                                label: "Order date",
                                size: "default",
                                type: "default",
                            },
                        ]}
                    />
                </div>
                <div>
                    <Button variant="outlined">Export</Button>
                </div>
            </div>
            <OrderListTable orders={orders?.content || []} />
        </div>
    );
};