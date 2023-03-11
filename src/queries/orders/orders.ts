import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
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