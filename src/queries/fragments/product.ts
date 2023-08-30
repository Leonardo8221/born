import { gql } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductWithCollectionsGraphqlDTO on ProductWithCollectionsGraphqlDTO {
    id
    product_id
    description
    colour_code
    colour_name
    colour_families
    attachments {
      id
      small_image_url
      medium_image_url
      large_image_url
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
    productVariants {
      colour_code
      colour_name
      colour_families
      id
      product_id
      style_number
      attachments {
        id
        small_image_url
        medium_image_url
        large_image_url
      }
      swatchImage {
        id
        large_image_url
        medium_image_url
        small_image_url
      }
    }
    swatchImage {
      id
      large_image_url
      medium_image_url
      small_image_url
    }
  }
`;
