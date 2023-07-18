import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders(
    $organizationId: BigInteger!
    $orderStatus: OrderStatus!
    $retailers: [String]
    $buyers: [String]
    $search: String
    $season: String
    $start: Int
    $rows: Int
  ) {
    ordersBySearch(
      organizationId: $organizationId
      search: $search
      retailers: $retailers
      buyers: $buyers
      season: $season
      start: $start
      rows: $rows
      orderStatus: $orderStatus
    ) {
      content {
        id
        name
        total_price
        billing_address
        buyer_data {
          id
          buyer_name
        }
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
        order_status
        size
        retailer_data {
          id
          store_name
          billing_store_address_line_1
        }
        season
        total_price
        total_quantity
      }
      total_pages
      total_elements
      number_of_elements
      size
    }
  }
`;
