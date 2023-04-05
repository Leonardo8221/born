import { gql } from '@apollo/client';

export const COLOUR_FAMILIES_QUERY = gql`
  query colourFamiliesQuery ($organizationId: BigInteger!) {
    colourFamiliesByNameAndOrganizationId(organizationId: $organizationId)
  }
`;

export const BUYERS_QUERY = gql`
  query buyersQuery ($organizationId: BigInteger!) {
    buyersByNameAndOrganizationId(organizationId: $organizationId)
  }
`;

export const RETAILERS_QUERY = gql`
  query retailersQuery ($organizationId: BigInteger!) {
    retailersByNameAndOrganizationId(organizationId: $organizationId)
  }
`;
