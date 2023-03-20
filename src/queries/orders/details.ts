import { gql } from '@apollo/client';

export const GET_ORDER_BY_ID = gql`
  query GetOrderByID($orderId: BigInteger!) {
    orderByOrderId(orderId: $orderId) {
      id
      name
      billing_address
      buyer_name
      created_date
      delivery_address
      discount
      email_address
      last_modified_by
      last_updated
      note
      payment_terms
      pricing_condition
      purchase_order
      retailer
      approved
      cancelled
      confirmed
      size
      retailer
      order_details {
        id
        note
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
          style_id
          size_type
          size_options
          size_category
          season
          min_order_value
          min_order_quantity
          measurements
          materials
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
