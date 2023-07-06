import { gql } from '@apollo/client';

export const ORDER_BY_SEARCH = gql`
  query orderBySearch(
    $organizationId: BigInteger!
    $orderStatus: OrderStatus!
    $start: Int
    $rows: Int
    $search: String
  ) {
    ordersBySearch(
      organizationId: $organizationId
      start: $start
      rows: $rows
      search: $search
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
        pricing_condition
      }
      total_pages
      total_elements
      number_of_elements
      size
    }
  }
`;
