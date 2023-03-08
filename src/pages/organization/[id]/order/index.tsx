import React from "react";
import { Draft } from "../../../../components/page-components/order/draft";
import { Confirmed } from "../../../../components/page-components/order/confirmed";
import Tabs from "../../../../components/molecules/Tab/Tabs";
import { Heading } from "../../../../components/molecules/Heading";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Footer from "@/components/layouts/Footer";
import { Header } from "@/components/molecules/Header";

const GET_ORDERS = gql`
  query GetOrders($organizationId: BigInteger!, $start: Int!, $rows: Int!) {
    ordersBySearch(
      organizationId: $organizationId
      start: $start
      rows: $rows
    ) {
      content {
        id
        name
        total
        billing_address
        buyer_name
        created_date
        delivery_address
        discount
        email_address
        last_modified_by
        last_updated
        note
        payment_terms
        pricing_condition
        purchase_order
        retailer
        approved
        cancelled
        confirmed
        size
        retailer
      }
      total_pages
      total_elements
      number_of_elements
      size
    }
  }
`;

export default function OrderManagement() {
  const router = useRouter();
  const organizationId = Number(router.query.id);

  const { data, error, loading } = useQuery(GET_ORDERS, {
    variables: { organizationId: organizationId, start: 0, rows: 10 },
  });
  console.log({ error });

  const tabs = [
    {
      id: 1,
      label: "Draft",
      content: <Draft orders={data?.ordersBySearch} />,
    },
    { id: 2, label: "Confirmed", content: <Confirmed /> },
    { id: 3, label: "Approved" },
    { id: 4, label: "Cancelled" },
  ];

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <Header rightNavNode={null} items={[{ label: "Retailers", href: "#" }]} />
      <div className="max-w-[1120px] mt-6 mx-auto">
        <Heading fontWeight="light" size={"sm"} className="">
          Order Management
        </Heading>
        <Tabs tabs={tabs} />
      </div>
      <Footer />
    </div>
  );
}
