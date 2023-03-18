import { gql } from "@apollo/client";

export const COLLECTION_FRAGMENT = gql`
  fragment CollectionGraphqlDTO on CollectionGraphqlDTO {
    id
    description
    name
    banner_guid
    banner_url
    linesheet_guid
    linesheet_url
    lookbook_guid
    lookbook_url
  }
`;

