import { gql } from '@apollo/client';

export const ORDER_BY_SEARCH = gql`
  query orderBySearch(
    $organizationId: BigInteger!
    $start: Int!
    $rows: Int!
    $confirmed: Boolean!
    $cancelled: Boolean!
  ) {
    ordersBySearch(
      organizationId: $organizationId
      start: $start
      rows: $rows
      confirmed: $confirmed
      cancelled: $cancelled
    ) {
      content {
        id
        name
        total
        billing_address
        buyer_name
      }
      total_pages
      total_elements
      number_of_elements
      size
    }
  }
`;
