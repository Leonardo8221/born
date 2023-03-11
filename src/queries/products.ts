import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from './fragments/product';

export const PRODUCTS_QUERY = gql`
  query getProducts ($organizationId: BigInteger!, $start: Int, $rows: Int) {
    productsBySearchAndOrganizationId (
      organizationId: $organizationId
      start: $start
      rows: $rows
    ) {
      content {
        ...ProductGraphqlDTO
      }
      total_pages
      total_elements
      number_of_elements
      size
    }
  }
  ${PRODUCT_FRAGMENT}
`;
