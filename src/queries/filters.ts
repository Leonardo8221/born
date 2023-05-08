import { gql } from '@apollo/client';

export const COLOUR_FAMILIES_QUERY = gql`
  query colourFamiliesQuery($organizationId: BigInteger!) {
    colourFamiliesByOrganizationId(organizationId: $organizationId)
  }
`;

export const COLOUR_FAMILIES_BY_COLLECTION_ID_QUERY = gql`
  query colourFamiliesByCollectionIdQuery($collectionId: BigInteger!) {
    colourFamiliesByCollectionId(collectionId: $collectionId)
  }
`;

export const BUYERS_QUERY = gql`
  query buyersQuery($organizationId: BigInteger!) {
    buyersByOrganizationId(organizationId: $organizationId)
  }
`;

export const RETAILERS_QUERY = gql`
  query retailersQuery($organizationId: BigInteger!) {
    retailersByOrganizationId(organizationId: $organizationId)
  }
`;

export const SEASONS_BY_COLLECTION_ID = gql`
  query seasonsByCollectionId($collectionId: BigInteger!) {
    seasonsByCollectionId(collectionId: $collectionId)
  }
`;

export const SEASONS_BY_ORGANIZATION_ID = gql`
  query seasonsByOrganizationId($organizationId: BigInteger!) {
    seasonsByOrganizationId(organizationId: $organizationId)
  }
`;
