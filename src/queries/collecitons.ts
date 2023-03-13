import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from './fragments/product';

export const COLLECTIONS_QUERY = gql`
  query getCollections($organizationId: BigInteger!, $start: Int, $rows: Int) {
    collectionsByOrganizationId(
      organizationId: $organizationId
      start: $start
      rows: $rows
    ) {
      id
      description
      name
      banner_guid
      linesheet_guid
      lookbook_guid
    }
  }
`;

export const PRODUCTS_BY_COLLECTION_ID_QUERY = gql`
  query getProductsByCollectionId(
    $collectionId: BigInteger!
    $search: String
    $start: Int
    $rows: Int
  ) {
    productsBySearchAndCollectionId(
      collectionId: $collectionId
      search: $search
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
