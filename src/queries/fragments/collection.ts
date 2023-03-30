import { gql } from '@apollo/client';

export const COLLECTION_FRAGMENT = gql`
  fragment CollectionGraphqlDTO on CollectionGraphqlDTO {
    id
    description
    name
    banner_guid
    banner_url
    linesheet_guid
    linesheet_name
    linesheet_url
    lookbook_guid
    lookbook_url
    lookbook_name
    products {
      attachments {
        id
        small_image_url
        medium_image_url
        large_image_url
      }
    }
  }
`;
