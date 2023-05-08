import { gql } from "@apollo/client";
import { PRODUCT_FRAGMENT } from "./fragments/product";

export const PRODUCTS_QUERY = gql`
  query getProducts(
    $organizationId: BigInteger!
    $search: String
    $collectionNames: [String]
    $colourFamilies: [String]
    $seasons: [String]
    $start: Int
    $rows: Int
  ) {
    productsBySearchAndOrganizationId(
      organizationId: $organizationId
      search: $search
      collectionNames: $collectionNames
      colourFamilies: $colourFamilies
      seasons: $seasons
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

export const GET_PRODUCT_BY_ID = gql`
  query getProductById(
    $productId: BigInteger!
  ) {
    productByProductId(
      productId: $productId
     ) {
      ...ProductWithCollectionsGraphqlDTO
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCTS_BY_COLLECTION_ID = gql`
  query getProductsBySearchAndCollectionId(
    $collectionId: BigInteger!
    $search: String
    $colourFamilies: [String]
    $seasons: [String]
    $start: Int
    $rows: Int
  ) {
    productsBySearchAndCollectionId(
      collectionId: $collectionId
      search: $search
      colourFamilies: $colourFamilies
      seasons: $seasons
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
