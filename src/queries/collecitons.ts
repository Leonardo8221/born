import { gql } from "@apollo/client";

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
