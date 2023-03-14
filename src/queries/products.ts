import { gql } from "@apollo/client";
import { PRODUCT_FRAGMENT } from "./fragments/product";

export const PRODUCTS_QUERY = gql`
  query getProducts(
    $organizationId: BigInteger!
    $search: String
    $start: Int
    $rows: Int
  ) {
    productsBySearchAndOrganizationId(
      organizationId: $organizationId
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

export const GET_PRODUCT_BY_ID = gql`
  query getProductById(
    $productId: BigInteger!
  ) {
    productByProductId(
      productId: $productId
     ) {
      ...ProductGraphqlDTO
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCTS_BY_COLLECTION_ID = gql`
  query getProductsBySearchAndCollectionId(
    $collectionId: BigInteger!
    $search: String
    $collectionNames: [String]
    $colourNames: [String]
    $season: String
    $start: Int
    $rows: Int
  ) {
    productsBySearchAndCollectionId(
      collectionId: $collectionId
      search: $search
      collectionNames: $collectionNames
      colourNames: $colourNames
      season: $season
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
