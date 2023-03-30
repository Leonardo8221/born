import { gql } from '@apollo/client';
import { ORGANIZATION_FRAGMENT } from './fragments/organzation';

export const ORGANIZATIONS_QUERY = gql`
  query getOrganizations {
    userWithOrganizationsAndUpdateLastLoggedInDate {
      organizations {
        ...OrganizationGraphqlDTO
      }
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;

export const GET_ORGANIZATION_BY_ID = gql`
  query getOrganizationById($id: BigInteger!) {
    userOrganizationByOrganizationId(id: $id) {
      organization {
        ...OrganizationGraphqlDTO
        currency_types
      }
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;

export const ORGANIZATION_QUERY = gql`
  query getOrganization($organizationId: BigInteger!) {
    organizationByOrganizationId(organizationId: $organizationId) {
      ...OrganizationGraphqlDTO
      currency_types
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;
