import { gql } from '@apollo/client';

export const USERS_FRAMGMENT = gql`
  fragment UserGraphqlDTO on UserGraphqlDTO {
    id
    birth_date
    keycloak_email
    keycloak_first_name
    keycloak_id
    keycloak_last_name
    keycloak_username
    last_logged_in
    password
    follow_notification_enabled
    message_notification_enabled
    order_notification_enabled
    product_notification_enabled
  }
`;
