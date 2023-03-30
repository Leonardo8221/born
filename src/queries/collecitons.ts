import { gql } from '@apollo/client';
import { COLLECTION_FRAGMENT } from './fragments/collection';
import { PRODUCT_FRAGMENT } from './fragments/product';

export const COLLECTIONS_QUERY = gql`
  query getCollections($organizationId: BigInteger!) {
    collectionsByOrganizationId(organizationId: $organizationId) {
      ...CollectionGraphqlDTO
    }
  }
  ${COLLECTION_FRAGMENT}
`;

export const COLLECTION_QUERY = gql`
  query getColleton($collectionId: BigInteger!) {
    collectionByCollectionId(collectionId: $collectionId) {
      ...CollectionGraphqlDTO
    }
  }
  ${COLLECTION_FRAGMENT}
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
        ...ProductWithCollectionsGraphqlDTO
      }
      total_pages
      total_elements
      number_of_elements
      size
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const COLLECTION_FILTER_QUERY = gql`
  query collections($organizationId: BigInteger!) {
    collectionsByOrganizationId(organizationId: $organizationId) {
      id
      name
    }
  }
`;
