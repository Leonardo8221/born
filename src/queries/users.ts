import { gql } from '@apollo/client';
import { ORGANIZATION_FRAGMENT } from './fragments/organzation';
import { USERS_FRAMGMENT } from './fragments/users';

export const USERS_QUERY = gql`
  query getUsers($organizationId: BigInteger!) {
    usersByOrganizationId(organizationId: $organizationId) {
      ...UserGraphqlDTO
    }
  }
  ${USERS_FRAMGMENT}
`;

export const USER_WITH_ORGANIZATION_QUERY = gql`
  query getUserwithOraganization {
    userWithOrganizationsAndUpdateLastLoggedInDate {
      ...UserGraphqlDTO
    }
  }
  ${USERS_FRAMGMENT}
`;
