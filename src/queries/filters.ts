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

export const RETAILERS_QUERY = gql`
  query retailersByOrganizationIdAndStoreName($organizationId: BigInteger!, $storeName: String) {
    retailersByOrganizationIdAndStoreName(organizationId: $organizationId, storeName: $storeName) {
      id
      store_name
    }
  }
`;

export const BUYERS_QUERY = gql`
  query buyersByOrganizationAndRetailerIdAndName (
    $organizationId: BigInteger!
    $retailerId: BigInteger
    $buyerName: String
  ) {
    buyersByOrganizationAndRetailerIdAndName (
      organizationId: $organizationId
      retailerId: $retailerId
      buyerName: $buyerName
    ) {
      id
      buyer_name
      email
    }
  }
`;

export const GET_RETAILERS = gql`
  query retailersByStoreName($storeName: String) {
    retailersByStoreName(storeName: $storeName) {
      id
      store_name
      billing_store_address_line_1
    }
  }
`;

export const GET_BUYERS = gql`
  query  (
    $retailerId: BigInteger
    $buyerName: String
  ) {
    buyersByRetailerIdAndName (
      retailerId: $retailerId
      buyerName: $buyerName
    ) {
      id
      buyer_name
      email
    }
  }
`;
