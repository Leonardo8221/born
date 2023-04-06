import { gql } from '@apollo/client';

export const COLOUR_FAMILIES_QUERY = gql`
  query colourFamiliesQuery ($organizationId: BigInteger!) {
    colourFamiliesByNameAndOrganizationId(organizationId: $organizationId)
  }
`;
