import { gql } from '@apollo/client';

export const GET_ORDER_BY_ID = gql`
  query GetOrderByID($orderId: BigInteger!) {
    orderByOrderId(orderId: $orderId) {
      id
      name
      billing_address
      buyer_data {
        id
        buyer_name
        email
      }
      created_date
      delivery_address
      delivery_window_start_date
      delivery_window_end_date
      discount
      total_price
      total_quantity
      surcharge
      email_address
      last_modified_by
      last_updated
      note
      payment_terms
      pricing_condition
      purchase_order
      retailer_data {
        id
        store_name
        billing_store_address_line_1
      }
      order_status
      order_type
      size
      season
      order_details {
        id
        note
        total_quantity
        wholesale_price
        wholesale_total_price
        eur_retail_price
        gbp_retail_price
        usd_retail_price
        product {
          id
          description
          colour_code
          colour_name
          colour_families
          associated_prices {
            currency
            exworks
            landed
            retail
          }
          attachments {
            id
            small_image_url
            medium_image_url
            large_image_url
          }
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
          style_number
          style_name
          style_id
          size_type
          size_options
          size_category
          season
          min_order_value
          min_order_quantity
          measurements
          materials
          productVariants {
            colour_code
            colour_name
            id
            product_id
            style_number
          }
        }
        order_detail_sizes {
          id
          quantity
          size
        }
      }
    }
  }
`;

export const PRICING_CONDITIONS_QUERY = gql`
  query pricingConditionsByOrderId($orderId: BigInteger!) {
    pricingConditionsByOrderId(orderId: $orderId) {
      label
      currency
    }
  }
`;
