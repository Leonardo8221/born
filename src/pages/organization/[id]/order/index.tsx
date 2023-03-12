import React from "react";
import { Draft } from "../../../../components/page-components/order/draft";
import { Confirmed } from "../../../../components/page-components/order/confirmed";
import Tabs from "../../../../components/molecules/Tab/Tabs";
import { Heading } from "../../../../components/molecules/Heading";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ShowcaseLayout from "@/components/layouts/ShowcaseLayout";
import { GET_ORDERS } from "../../../../queries/orders/orders";

export default function OrderManagement() {
  const router = useRouter();
  const id = router?.query?.id || "";
  const organizationId: number = +id;

  const { data, error, loading } = useQuery(GET_ORDERS, {
    variables: { organizationId: organizationId, start: 0, rows: 10 },
  });
  const ordersBySearch = data?.ordersBySearch?.content || [];

  const tabs = [
    {
      id: 1,
      label: "Draft",
      content: <Draft content={ordersBySearch} />,
    },
    { id: 2, label: "Confirmed", content: <Confirmed /> },
    { id: 3, label: "Approved" },
    { id: 4, label: "Cancelled" },
  ];

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <ShowcaseLayout>
      <div className="max-w-[1120px] mt-6 mx-auto">
        <Heading fontWeight="light" size={"sm"} className="">
          Order Management
        </Heading>
        <Tabs tabs={tabs} />
      </div>
    </ShowcaseLayout>
  );
}
