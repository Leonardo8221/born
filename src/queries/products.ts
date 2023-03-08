import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from './fragments/product';

export const PRODUCTS_QUERY = gql`
  query getProductsBySearchAndOrganizationId {
    productsBySearchAndOrganizationId (
      organizationId: 1
      start: 0
      rows: 10
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
