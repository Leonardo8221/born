import { gql } from '@apollo/client';

export const COLLECTIONS_QUERY = gql`
  query getCollections {
    collectionsByOrganizationId (
      organizationId: 1,
      start: 0,
      rows: 10,
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
