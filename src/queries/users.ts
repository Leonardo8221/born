import { gql } from '@apollo/client';
import { USERS_FRAMGMENT } from './fragments/users';

export const USERS_QUERY = gql`
  query getUsers($organizationId: BigInteger!) {
    usersOrganizationsByOrganizationId(organizationId: $organizationId) {
      id
      role_type
      user_entity {
        ...UserGraphqlDTO
      }
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
