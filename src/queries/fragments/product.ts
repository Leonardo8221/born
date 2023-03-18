import { gql } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductGraphqlDTO on ProductGraphqlDTO {
    id
    product_id
    description
    colour_code
    colour_name
    colour_families
    attachments {
      id
      attachment_url
      attachment_guid
      type
    }
    associated_prices {
      currency
      exworks
      landed
      retail
    }
    keywords
    first_category
    second_category
    third_category
    fourth_category
    compositions
    country_of_origin
    delivery_lead_time
    delivery_window_end_date
    delivery_window_start_date
    description
    upc
    style_name
    style_number
    style_id
    size_type
    size_options
    size_category
    season
    min_order_value
    min_order_quantity
    measurements
    materials
    collections {
      id
      name
    }
  }
`;
