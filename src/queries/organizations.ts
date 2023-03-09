import { gql } from '@apollo/client';
import { ORGANIZATION_FRAGMENT } from './fragments/organzation';

export const ORGANIZATIONS_QUERY = gql`
  query getUserWithOrganizationsAndUpdateLastLoggedInDate {
    userWithOrganizationsAndUpdateLastLoggedInDate {
      organizations {
        ...OrganizationGraphqlDTO
      }
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;
