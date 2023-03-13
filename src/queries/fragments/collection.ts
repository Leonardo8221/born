import { gql } from "@apollo/client";

export const COLLECTION_FRAGMENT = gql`
  fragment CollectionGraphqlDTO on CollectionGraphqlDTO {
    id
    description
    name
    banner_guid
    linesheet_guid
    lookbook_guid
  }
`;

