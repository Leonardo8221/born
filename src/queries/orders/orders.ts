import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders(
    $organizationId: BigInteger!
    $search: String
    $start: Int
    $rows: Int
    $confirmed: Boolean
    $approved: Boolean
    $cancelled: Boolean
  ) {
    ordersBySearch(
      organizationId: $organizationId
      search: $search
      start: $start
      rows: $rows
      confirmed: $confirmed
      approved: $approved
      cancelled: $cancelled
    ) {
      content {
        id
        name
        total_price
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
