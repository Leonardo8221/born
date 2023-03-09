export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  DateTime: any;
};

export type CollectionGraphqlDto = {
  __typename?: "CollectionGraphqlDTO";
  banner_guid?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  linesheet_guid?: Maybe<Scalars["String"]>;
  lookbook_guid?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type OrderDetailGraphqlDto = {
  __typename?: "OrderDetailGraphqlDTO";
  note?: Maybe<Scalars["String"]>;
  product?: Maybe<ProductGraphqlDto>;
  quantity?: Maybe<Scalars["Int"]>;
};

export type OrderGraphqlDto = {
  __typename?: "OrderGraphqlDTO";
  approved: Scalars["Boolean"];
  billing_address?: Maybe<Scalars["String"]>;
  buyer_name?: Maybe<Scalars["String"]>;
  cancelled: Scalars["Boolean"];
  confirmed: Scalars["Boolean"];
  created_by?: Maybe<Scalars["String"]>;
  /** ISO-8601 */
  created_date?: Maybe<Scalars["DateTime"]>;
  delivery_address?: Maybe<Scalars["String"]>;
  discount?: Maybe<Scalars["BigDecimal"]>;
  email_address?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  last_modified_by?: Maybe<Scalars["String"]>;
  /** ISO-8601 */
  last_updated?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Scalars["String"]>;
  note?: Maybe<Scalars["String"]>;
  order_details?: Maybe<Array<Maybe<OrderDetailGraphqlDto>>>;
  payment_terms?: Maybe<Scalars["String"]>;
  pricing_condition?: Maybe<Scalars["String"]>;
  purchase_order?: Maybe<Scalars["String"]>;
  retailer?: Maybe<Scalars["String"]>;
  season?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  surcharge?: Maybe<Scalars["BigDecimal"]>;
  total?: Maybe<Scalars["BigDecimal"]>;
};

export type OrganizationGraphqlDto = {
  __typename?: "OrganizationGraphqlDTO";
  address?: Maybe<Scalars["String"]>;
  banner_guid?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  collections?: Maybe<Array<Maybe<CollectionGraphqlDto>>>;
  country_of_origin?: Maybe<Scalars["String"]>;
  currency_types?: Maybe<Array<Maybe<Scalars["String"]>>>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  instagram_link?: Maybe<Scalars["String"]>;
  linesheet_guid?: Maybe<Scalars["String"]>;
  logo_guid?: Maybe<Scalars["String"]>;
  lookbook_guid?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  organization_type?: Maybe<OrganizationType>;
  product_csv_guid?: Maybe<Scalars["String"]>;
  terms_and_conditions?: Maybe<Scalars["String"]>;
  website_link?: Maybe<Scalars["String"]>;
  year_of_inception?: Maybe<Scalars["String"]>;
};

export enum OrganizationType {
  Brand = "BRAND",
  Retailer = "RETAILER",
}

export type PageWrapper_OrderGraphqlDto = {
  __typename?: "PageWrapper_OrderGraphqlDTO";
  content?: Maybe<Array<Maybe<OrderGraphqlDto>>>;
  number: Scalars["Int"];
  number_of_elements: Scalars["Int"];
  size: Scalars["Int"];
  total_elements: Scalars["BigInteger"];
  total_pages: Scalars["Int"];
};

export type PageWrapper_ProductGraphqlDto = {
  __typename?: "PageWrapper_ProductGraphqlDTO";
  content?: Maybe<Array<Maybe<ProductGraphqlDto>>>;
  number: Scalars["Int"];
  number_of_elements: Scalars["Int"];
  size: Scalars["Int"];
  total_elements: Scalars["BigInteger"];
  total_pages: Scalars["Int"];
};

export type PriceGraphqlDto = {
  __typename?: "PriceGraphqlDTO";
  currency?: Maybe<Scalars["String"]>;
  exworks?: Maybe<Scalars["BigDecimal"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  landed?: Maybe<Scalars["BigDecimal"]>;
  retail?: Maybe<Scalars["BigDecimal"]>;
};

export type ProductGraphqlDto = {
  __typename?: "ProductGraphqlDTO";
  associated_prices?: Maybe<Array<Maybe<PriceGraphqlDto>>>;
  collections?: Maybe<Array<Maybe<CollectionGraphqlDto>>>;
  colour_code?: Maybe<Scalars["String"]>;
  colour_families?: Maybe<Array<Maybe<Scalars["String"]>>>;
  colour_name?: Maybe<Scalars["String"]>;
  compositions?: Maybe<Array<Maybe<Scalars["String"]>>>;
  country_of_origin?: Maybe<Scalars["String"]>;
  delivery_lead_time?: Maybe<Scalars["Int"]>;
  /** ISO-8601 */
  delivery_window_end_date?: Maybe<Scalars["DateTime"]>;
  /** ISO-8601 */
  delivery_window_start_date?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  first_category?: Maybe<Scalars["String"]>;
  fourth_category?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  keywords?: Maybe<Array<Maybe<Scalars["String"]>>>;
  materials?: Maybe<Array<Maybe<Scalars["String"]>>>;
  measurements?: Maybe<Array<Maybe<Scalars["String"]>>>;
  min_order_quantity?: Maybe<Scalars["Int"]>;
  min_order_value?: Maybe<Scalars["Int"]>;
  product_id?: Maybe<Scalars["String"]>;
  season?: Maybe<Scalars["String"]>;
  second_category?: Maybe<Scalars["String"]>;
  size_category?: Maybe<Scalars["String"]>;
  size_options?: Maybe<Array<Maybe<Scalars["String"]>>>;
  size_type?: Maybe<Scalars["String"]>;
  style_id?: Maybe<Scalars["String"]>;
  style_name?: Maybe<Scalars["String"]>;
  style_number?: Maybe<Scalars["String"]>;
  third_category?: Maybe<Scalars["String"]>;
  upc?: Maybe<Scalars["String"]>;
};

/** Query root */
export type Query = {
  __typename?: "Query";
  /** Return collection by collection id */
  collectionByCollectionId?: Maybe<CollectionGraphqlDto>;
  /** Return list of organization's collections */
  collectionsByOrganizationId?: Maybe<Array<Maybe<CollectionGraphqlDto>>>;
  /** Return order by order id */
  orderByOrderId?: Maybe<OrderGraphqlDto>;
  /** Return list of all filtered order's by retailers, buyerNames, confirmed, approved, cancelled,createdDate and createdBy */
  ordersBySearch?: Maybe<PageWrapper_OrderGraphqlDto>;
  /** Return collection by collection id */
  organizationByOrganizationId?: Maybe<OrganizationGraphqlDto>;
  /** Return product by product id */
  productByProductId?: Maybe<ProductGraphqlDto>;
  /** Return list of product variant's by styleNumber */
  productVariantsByStyleNumber?: Maybe<Array<Maybe<ProductGraphqlDto>>>;
  /** Return list of filtered product's by collection id */
  productsBySearchAndCollectionId?: Maybe<PageWrapper_ProductGraphqlDto>;
  /** Return list of filtered product's by organization id */
  productsBySearchAndOrganizationId?: Maybe<PageWrapper_ProductGraphqlDto>;
  /** Return user with its organization data */
  userOrganizationByOrganizationId?: Maybe<UserOrganizationGraphqlDto>;
  /** Return user with list of user organizations and update last logged in date */
  userWithOrganizationsAndUpdateLastLoggedInDate?: Maybe<UserGraphqlDto>;
  /** Return users by keycloak email */
  usersByKeycloakEmail?: Maybe<Array<Maybe<UserGraphqlDto>>>;
  /** Return users by organization id */
  usersByOrganizationId?: Maybe<Array<Maybe<UserGraphqlDto>>>;
};

/** Query root */
export type QueryCollectionByCollectionIdArgs = {
  collectionId: Scalars["BigInteger"];
};

/** Query root */
export type QueryCollectionsByOrganizationIdArgs = {
  organizationId: Scalars["BigInteger"];
  rows?: InputMaybe<Scalars["Int"]>;
  start?: InputMaybe<Scalars["Int"]>;
};

/** Query root */
export type QueryOrderByOrderIdArgs = {
  orderId: Scalars["BigInteger"];
};

/** Query root */
export type QueryOrdersBySearchArgs = {
  approved?: InputMaybe<Scalars["Boolean"]>;
  buyerNames?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  cancelled?: InputMaybe<Scalars["Boolean"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]>;
  createdBy?: InputMaybe<Scalars["String"]>;
  createdDate?: InputMaybe<Scalars["DateTime"]>;
  organizationId: Scalars["BigInteger"];
  retailers?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  rows?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
};

/** Query root */
export type QueryOrganizationByOrganizationIdArgs = {
  organizationId: Scalars["BigInteger"];
};

/** Query root */
export type QueryProductByProductIdArgs = {
  productId: Scalars["BigInteger"];
};

/** Query root */
export type QueryProductVariantsByStyleNumberArgs = {
  styleNumber: Scalars["String"];
};

/** Query root */
export type QueryProductsBySearchAndCollectionIdArgs = {
  collectionId: Scalars["BigInteger"];
  collectionNames?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  colourNames?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  rows?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  season?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
};

/** Query root */
export type QueryProductsBySearchAndOrganizationIdArgs = {
  collectionNames?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  colourNames?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  organizationId: Scalars["BigInteger"];
  rows?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  season?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
};

/** Query root */
export type QueryUserOrganizationByOrganizationIdArgs = {
  id: Scalars["BigInteger"];
};

/** Query root */
export type QueryUsersByKeycloakEmailArgs = {
  keycloakEmail: Scalars["String"];
};

/** Query root */
export type QueryUsersByOrganizationIdArgs = {
  organizationId: Scalars["BigInteger"];
};

export enum RoleType {
  Manager = "MANAGER",
  Owner = "OWNER",
}

export type UserGraphqlDto = {
  __typename?: "UserGraphqlDTO";
  /** ISO-8601 */
  birth_date?: Maybe<Scalars["DateTime"]>;
  follow_notification_enabled: Scalars["Boolean"];
  id?: Maybe<Scalars["BigInteger"]>;
  keycloak_email?: Maybe<Scalars["String"]>;
  keycloak_first_name?: Maybe<Scalars["String"]>;
  keycloak_id?: Maybe<Scalars["String"]>;
  keycloak_last_name?: Maybe<Scalars["String"]>;
  keycloak_username?: Maybe<Scalars["String"]>;
  /** ISO-8601 */
  last_logged_in?: Maybe<Scalars["DateTime"]>;
  message_notification_enabled: Scalars["Boolean"];
  order_notification_enabled: Scalars["Boolean"];
  organizations?: Maybe<Array<Maybe<OrganizationGraphqlDto>>>;
  password?: Maybe<Scalars["String"]>;
  product_notification_enabled: Scalars["Boolean"];
};

export type UserOrganizationGraphqlDto = {
  __typename?: "UserOrganizationGraphqlDTO";
  created_by?: Maybe<Scalars["String"]>;
  /** ISO-8601 */
  created_date?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  organization: OrganizationGraphqlDto;
  role_type: RoleType;
  user_entity: UserGraphqlDto;
};

export type OrganizationGraphqlDtoFragment = {
  __typename?: "OrganizationGraphqlDTO";
  id?: any | null;
  name?: string | null;
  address?: string | null;
  description?: string | null;
  city?: string | null;
  country_of_origin?: string | null;
  instagram_link?: string | null;
  organization_type?: OrganizationType | null;
  terms_and_conditions?: string | null;
  website_link?: string | null;
  year_of_inception?: string | null;
};

export type ProductGraphqlDtoFragment = {
  __typename?: "ProductGraphqlDTO";
  id?: any | null;
  product_id?: string | null;
  description?: string | null;
  colour_code?: string | null;
  colour_name?: string | null;
  colour_families?: Array<string | null> | null;
  keywords?: Array<string | null> | null;
  first_category?: string | null;
  second_category?: string | null;
  third_category?: string | null;
  fourth_category?: string | null;
  compositions?: Array<string | null> | null;
  country_of_origin?: string | null;
  delivery_lead_time?: number | null;
  delivery_window_end_date?: any | null;
  delivery_window_start_date?: any | null;
  upc?: string | null;
  style_number?: string | null;
  style_id?: string | null;
  size_type?: string | null;
  size_options?: Array<string | null> | null;
  size_category?: string | null;
  season?: string | null;
  min_order_value?: number | null;
  min_order_quantity?: number | null;
  measurements?: Array<string | null> | null;
  materials?: Array<string | null> | null;
  associated_prices?: Array<{
    __typename?: "PriceGraphqlDTO";
    currency?: string | null;
    exworks?: any | null;
    landed?: any | null;
    retail?: any | null;
  } | null> | null;
  collections?: Array<{
    __typename?: "CollectionGraphqlDTO";
    id?: any | null;
    name?: string | null;
  } | null> | null;
};

export type GetUserWithOrganizationsAndUpdateLastLoggedInDateQueryVariables =
  Exact<{ [key: string]: never }>;

export type GetUserWithOrganizationsAndUpdateLastLoggedInDateQuery = {
  __typename?: "Query";
  userWithOrganizationsAndUpdateLastLoggedInDate?: {
    __typename?: "UserGraphqlDTO";
    organizations?: Array<{
      __typename?: "OrganizationGraphqlDTO";
      id?: any | null;
      name?: string | null;
      address?: string | null;
      description?: string | null;
      city?: string | null;
      country_of_origin?: string | null;
      instagram_link?: string | null;
      organization_type?: OrganizationType | null;
      terms_and_conditions?: string | null;
      website_link?: string | null;
      year_of_inception?: string | null;
    } | null> | null;
  } | null;
};

export type GetProductsBySearchAndOrganizationIdQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetProductsBySearchAndOrganizationIdQuery = {
  __typename?: "Query";
  productsBySearchAndOrganizationId?: {
    __typename?: "PageWrapper_ProductGraphqlDTO";
    total_pages: number;
    total_elements: any;
    number_of_elements: number;
    size: number;
    content?: Array<{
      __typename?: "ProductGraphqlDTO";
      id?: any | null;
      product_id?: string | null;
      description?: string | null;
      colour_code?: string | null;
      colour_name?: string | null;
      colour_families?: Array<string | null> | null;
      keywords?: Array<string | null> | null;
      first_category?: string | null;
      second_category?: string | null;
      third_category?: string | null;
      fourth_category?: string | null;
      compositions?: Array<string | null> | null;
      country_of_origin?: string | null;
      delivery_lead_time?: number | null;
      delivery_window_end_date?: any | null;
      delivery_window_start_date?: any | null;
      upc?: string | null;
      style_number?: string | null;
      style_id?: string | null;
      size_type?: string | null;
      size_options?: Array<string | null> | null;
      size_category?: string | null;
      season?: string | null;
      min_order_value?: number | null;
      min_order_quantity?: number | null;
      measurements?: Array<string | null> | null;
      materials?: Array<string | null> | null;
      associated_prices?: Array<{
        __typename?: "PriceGraphqlDTO";
        currency?: string | null;
        exworks?: any | null;
        landed?: any | null;
        retail?: any | null;
      } | null> | null;
      collections?: Array<{
        __typename?: "CollectionGraphqlDTO";
        id?: any | null;
        name?: string | null;
      } | null> | null;
    } | null> | null;
  } | null;
};
