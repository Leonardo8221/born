import { gql } from '@apollo/client';
// import { PRODUCT_FRAGMENT } from './fragments/product';

export const PRODUCTS_BY_SEARCH_AND_ORGANIZATION_QUERY = gql`
  query {
    productsBySearchAndOrganizationId (
      organizationId: 3
      search: "test"
      collectionNames: ["Collection 1"]
      colourNames: ["RED"]
      season: "Test"
      start: 0
      rows: 10
    ) {
      content {
        id
        product_id
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
      total_pages
      total_elements
      number_of_elements
      size
    }
  }
`;
