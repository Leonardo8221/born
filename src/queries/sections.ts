import gql from "graphql-tag";
import { PRODUCT_FRAGMENT } from "./fragments/product";

export const SECTIONS_BY_COLLECTION_ID_QUERY = gql`
  query getSections(
    $collectionId: BigInteger!
    $search: String
    $colourFamilies: [String]
    $seasons: [String]
    $start: Int
    $rows: Int
  ) {
    sectionProductsBySearchAndCollectionId(
      collectionId: $collectionId
      search: $search
      colourFamilies: $colourFamilies
      seasons: $seasons
      start: $start
      rows: $rows
    ) {
      content {
        id
        name
        description
        products {
          ...ProductWithCollectionsGraphqlDTO
        }
      }
      total_pages
      total_elements
      number_of_elements
      size
    }
  }
  ${PRODUCT_FRAGMENT}
`;