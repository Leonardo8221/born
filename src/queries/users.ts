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

export const USER_BY_KEYCLOAK_EMAIL = gql`
  query getUserByKeycloakEmail ($keycloakEmail: String!) {
    usersByKeycloakEmail(keycloakEmail: $keycloakEmail) {
      id
      keycloak_first_name
      keycloak_last_name
      keycloak_email
      birth_date
      keycloak_username
      last_logged_in
      follow_notification_enabled
      message_notification_enabled
      order_notification_enabled
      product_notification_enabled
    }
  }
`;
