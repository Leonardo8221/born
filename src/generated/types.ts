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

export enum AttachmentType {
  Image = "IMAGE",
  Video = "VIDEO",
}

export type CollectionGraphqlDto = {
  __typename?: "CollectionGraphqlDTO";
  banner_guid?: Maybe<Scalars["String"]>;
  banner_url?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  linesheet_guid?: Maybe<Scalars["String"]>;
  linesheet_url?: Maybe<Scalars["String"]>;
  lookbook_guid?: Maybe<Scalars["String"]>;
  lookbook_url?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type OrderDetailGraphqlDto = {
  __typename?: "OrderDetailGraphqlDTO";
  id?: Maybe<Scalars["BigInteger"]>;
  note?: Maybe<Scalars["String"]>;
  order_detail_sizes?: Maybe<Array<Maybe<OrderDetailSizeGraphqlDto>>>;
  product?: Maybe<ProductGraphqlDto>;
};

export type OrderDetailSizeGraphqlDto = {
  __typename?: "OrderDetailSizeGraphqlDTO";
  id?: Maybe<Scalars["BigInteger"]>;
  quantity?: Maybe<Scalars["Int"]>;
  size?: Maybe<Scalars["String"]>;
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
  pricing_condition?: Maybe<PricingCondition>;
  purchase_order?: Maybe<Scalars["String"]>;
  retailer?: Maybe<Scalars["String"]>;
  season?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  surcharge?: Maybe<Scalars["BigDecimal"]>;
  total_price?: Maybe<Scalars["BigDecimal"]>;
  total_quantity?: Maybe<Scalars["Int"]>;
};

export type OrganizationGraphqlDto = {
  __typename?: "OrganizationGraphqlDTO";
  address?: Maybe<Scalars["String"]>;
  banner_guid?: Maybe<Scalars["String"]>;
  banner_url?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  collections?: Maybe<Array<Maybe<CollectionGraphqlDto>>>;
  country_of_origin?: Maybe<Scalars["String"]>;
  currency_types?: Maybe<Array<Maybe<Scalars["String"]>>>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  instagram_link?: Maybe<Scalars["String"]>;
  linesheet_guid?: Maybe<Scalars["String"]>;
  linesheet_url?: Maybe<Scalars["String"]>;
  logo_guid?: Maybe<Scalars["String"]>;
  logo_url?: Maybe<Scalars["String"]>;
  lookbook_guid?: Maybe<Scalars["String"]>;
  lookbook_url?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  organization_type?: Maybe<OrganizationType>;
  product_csv_guid?: Maybe<Scalars["String"]>;
  product_csv_url?: Maybe<Scalars["String"]>;
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

export enum PricingCondition {
  EurExworks = "EUR_EXWORKS",
  EurLanded = "EUR_LANDED",
  EurRetail = "EUR_RETAIL",
  GbpExworks = "GBP_EXWORKS",
  GbpLanded = "GBP_LANDED",
  GbpRetail = "GBP_RETAIL",
  UsdExworks = "USD_EXWORKS",
  UsdLanded = "USD_LANDED",
  UsdRetail = "USD_RETAIL",
}

export type ProductAttachmentGraphqlDto = {
  __typename?: "ProductAttachmentGraphqlDTO";
  id?: Maybe<Scalars["BigInteger"]>;
  large_image_url?: Maybe<Scalars["String"]>;
  medium_image_url?: Maybe<Scalars["String"]>;
  small_image_url?: Maybe<Scalars["String"]>;
  type?: Maybe<AttachmentType>;
};

export type ProductGraphqlDto = {
  __typename?: "ProductGraphqlDTO";
  associated_prices?: Maybe<Array<Maybe<PriceGraphqlDto>>>;
  attachments?: Maybe<Array<Maybe<ProductAttachmentGraphqlDto>>>;
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
  /** Return organization by organization id */
  organizationByOrganizationId?: Maybe<OrganizationGraphqlDto>;
  /** Return user organizations by logged user keycloak id */
  organizationsByLoggedUser?: Maybe<Array<Maybe<OrganizationGraphqlDto>>>;
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
  /** Return users with organizations by organization id */
  usersOrganizationsByOrganizationId?: Maybe<
    Array<Maybe<UserOrganizationGraphqlDto>>
  >;
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
export type QueryUsersOrganizationsByOrganizationIdArgs = {
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

export type GetCollectionsQueryVariables = Exact<{
  organizationId: Scalars["BigInteger"];
  start?: InputMaybe<Scalars["Int"]>;
  rows?: InputMaybe<Scalars["Int"]>;
}>;

export type GetCollectionsQuery = {
  __typename?: "Query";
  collectionsByOrganizationId?: Array<{
    __typename?: "CollectionGraphqlDTO";
    id?: any | null;
    description?: string | null;
    name?: string | null;
    banner_guid?: string | null;
    banner_url?: string | null;
    linesheet_guid?: string | null;
    linesheet_url?: string | null;
    lookbook_guid?: string | null;
    lookbook_url?: string | null;
  } | null> | null;
};

export type GetColletonQueryVariables = Exact<{
  collectionId: Scalars["BigInteger"];
}>;

export type GetColletonQuery = {
  __typename?: "Query";
  collectionByCollectionId?: {
    __typename?: "CollectionGraphqlDTO";
    id?: any | null;
    description?: string | null;
    name?: string | null;
    banner_guid?: string | null;
    banner_url?: string | null;
    linesheet_guid?: string | null;
    linesheet_url?: string | null;
    lookbook_guid?: string | null;
    lookbook_url?: string | null;
  } | null;
};

export type GetProductsByCollectionIdQueryVariables = Exact<{
  collectionId: Scalars["BigInteger"];
  search?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  rows?: InputMaybe<Scalars["Int"]>;
}>;

export type GetProductsByCollectionIdQuery = {
  __typename?: "Query";
  productsBySearchAndCollectionId?: {
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
      style_name?: string | null;
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
      attachments?: Array<{
        __typename?: "ProductAttachmentGraphqlDTO";
        id?: any | null;
        small_image_url?: string | null;
        medium_image_url?: string | null;
        large_image_url?: string | null;
      } | null> | null;
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

export type CollectionGraphqlDtoFragment = {
  __typename?: "CollectionGraphqlDTO";
  id?: any | null;
  description?: string | null;
  name?: string | null;
  banner_guid?: string | null;
  banner_url?: string | null;
  linesheet_guid?: string | null;
  linesheet_url?: string | null;
  lookbook_guid?: string | null;
  lookbook_url?: string | null;
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
  logo_guid?: string | null;
  banner_guid?: string | null;
  banner_url?: string | null;
  logo_url?: string | null;
  linesheet_url?: string | null;
  lookbook_url?: string | null;
  collections?: Array<{
    __typename?: "CollectionGraphqlDTO";
    name?: string | null;
    id?: any | null;
    banner_url?: string | null;
  } | null> | null;
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
  style_name?: string | null;
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
  attachments?: Array<{
    __typename?: "ProductAttachmentGraphqlDTO";
    id?: any | null;
    small_image_url?: string | null;
    medium_image_url?: string | null;
    large_image_url?: string | null;
  } | null> | null;
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

export type UserGraphqlDtoFragment = {
  __typename?: "UserGraphqlDTO";
  id?: any | null;
  birth_date?: any | null;
  keycloak_email?: string | null;
  keycloak_first_name?: string | null;
  keycloak_id?: string | null;
  keycloak_last_name?: string | null;
  keycloak_username?: string | null;
  last_logged_in?: any | null;
  password?: string | null;
  follow_notification_enabled: boolean;
  message_notification_enabled: boolean;
  order_notification_enabled: boolean;
  product_notification_enabled: boolean;
};

export type GetOrderByIdQueryVariables = Exact<{
  orderId: Scalars["BigInteger"];
}>;

export type GetOrderByIdQuery = {
  __typename?: "Query";
  orderByOrderId?: {
    __typename?: "OrderGraphqlDTO";
    id?: any | null;
    name?: string | null;
    billing_address?: string | null;
    buyer_name?: string | null;
    created_date?: any | null;
    delivery_address?: string | null;
    discount?: any | null;
    email_address?: string | null;
    last_modified_by?: string | null;
    last_updated?: any | null;
    note?: string | null;
    payment_terms?: string | null;
    pricing_condition?: PricingCondition | null;
    purchase_order?: string | null;
    retailer?: string | null;
    approved: boolean;
    cancelled: boolean;
    confirmed: boolean;
    size?: string | null;
    order_details?: Array<{
      __typename?: "OrderDetailGraphqlDTO";
      id?: any | null;
      note?: string | null;
      product?: {
        __typename?: "ProductGraphqlDTO";
        id?: any | null;
        description?: string | null;
        colour_code?: string | null;
        colour_name?: string | null;
        colour_families?: Array<string | null> | null;
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
      } | null;
      order_detail_sizes?: Array<{
        __typename?: "OrderDetailSizeGraphqlDTO";
        id?: any | null;
        quantity?: number | null;
        size?: string | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type GetOrdersQueryVariables = Exact<{
  organizationId: Scalars["BigInteger"];
  start: Scalars["Int"];
  rows: Scalars["Int"];
  confirmed: Scalars["Boolean"];
  approved: Scalars["Boolean"];
  cancelled: Scalars["Boolean"];
}>;

export type GetOrdersQuery = {
  __typename?: "Query";
  ordersBySearch?: {
    __typename?: "PageWrapper_OrderGraphqlDTO";
    total_pages: number;
    total_elements: any;
    number_of_elements: number;
    size: number;
    content?: Array<{
      __typename?: "OrderGraphqlDTO";
      id?: any | null;
      name?: string | null;
      total_price?: any | null;
      billing_address?: string | null;
      buyer_name?: string | null;
      created_date?: any | null;
      delivery_address?: string | null;
      discount?: any | null;
      email_address?: string | null;
      last_modified_by?: string | null;
      last_updated?: any | null;
      note?: string | null;
      payment_terms?: string | null;
      pricing_condition?: PricingCondition | null;
      purchase_order?: string | null;
      retailer?: string | null;
      approved: boolean;
      cancelled: boolean;
      confirmed: boolean;
      size?: string | null;
    } | null> | null;
  } | null;
};

export type OrderBySearchQueryVariables = Exact<{
  organizationId: Scalars["BigInteger"];
  start: Scalars["Int"];
  rows: Scalars["Int"];
  confirmed: Scalars["Boolean"];
  cancelled: Scalars["Boolean"];
}>;

export type OrderBySearchQuery = {
  __typename?: "Query";
  ordersBySearch?: {
    __typename?: "PageWrapper_OrderGraphqlDTO";
    total_pages: number;
    total_elements: any;
    number_of_elements: number;
    size: number;
    content?: Array<{
      __typename?: "OrderGraphqlDTO";
      id?: any | null;
      name?: string | null;
      total_price?: any | null;
      billing_address?: string | null;
      buyer_name?: string | null;
    } | null> | null;
  } | null;
};

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetOrganizationsQuery = {
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
      logo_guid?: string | null;
      banner_guid?: string | null;
      banner_url?: string | null;
      logo_url?: string | null;
      linesheet_url?: string | null;
      lookbook_url?: string | null;
      collections?: Array<{
        __typename?: "CollectionGraphqlDTO";
        name?: string | null;
        id?: any | null;
        banner_url?: string | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type GetOrganizationByIdQueryVariables = Exact<{
  id: Scalars["BigInteger"];
}>;

export type GetOrganizationByIdQuery = {
  __typename?: "Query";
  userOrganizationByOrganizationId?: {
    __typename?: "UserOrganizationGraphqlDTO";
    organization: {
      __typename?: "OrganizationGraphqlDTO";
      currency_types?: Array<string | null> | null;
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
      logo_guid?: string | null;
      banner_guid?: string | null;
      banner_url?: string | null;
      logo_url?: string | null;
      linesheet_url?: string | null;
      lookbook_url?: string | null;
      collections?: Array<{
        __typename?: "CollectionGraphqlDTO";
        name?: string | null;
        id?: any | null;
        banner_url?: string | null;
      } | null> | null;
    };
  } | null;
};

export type GetOrganizationQueryVariables = Exact<{
  organizationId: Scalars["BigInteger"];
}>;

export type GetOrganizationQuery = {
  __typename?: "Query";
  organizationByOrganizationId?: {
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
    logo_guid?: string | null;
    banner_guid?: string | null;
    banner_url?: string | null;
    logo_url?: string | null;
    linesheet_url?: string | null;
    lookbook_url?: string | null;
    collections?: Array<{
      __typename?: "CollectionGraphqlDTO";
      name?: string | null;
      id?: any | null;
      banner_url?: string | null;
    } | null> | null;
  } | null;
};

export type GetProductsQueryVariables = Exact<{
  organizationId: Scalars["BigInteger"];
  search?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  rows?: InputMaybe<Scalars["Int"]>;
}>;

export type GetProductsQuery = {
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
      style_name?: string | null;
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
      attachments?: Array<{
        __typename?: "ProductAttachmentGraphqlDTO";
        id?: any | null;
        small_image_url?: string | null;
        medium_image_url?: string | null;
        large_image_url?: string | null;
      } | null> | null;
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

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars["BigInteger"];
}>;

export type GetProductByIdQuery = {
  __typename?: "Query";
  productByProductId?: {
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
    style_name?: string | null;
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
    attachments?: Array<{
      __typename?: "ProductAttachmentGraphqlDTO";
      id?: any | null;
      small_image_url?: string | null;
      medium_image_url?: string | null;
      large_image_url?: string | null;
    } | null> | null;
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
  } | null;
};

export type GetProductsBySearchAndCollectionIdQueryVariables = Exact<{
  collectionId: Scalars["BigInteger"];
  search?: InputMaybe<Scalars["String"]>;
  colourNames?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  season?: InputMaybe<Scalars["String"]>;
  start?: InputMaybe<Scalars["Int"]>;
  rows?: InputMaybe<Scalars["Int"]>;
}>;

export type GetProductsBySearchAndCollectionIdQuery = {
  __typename?: "Query";
  productsBySearchAndCollectionId?: {
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
      style_name?: string | null;
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
      attachments?: Array<{
        __typename?: "ProductAttachmentGraphqlDTO";
        id?: any | null;
        small_image_url?: string | null;
        medium_image_url?: string | null;
        large_image_url?: string | null;
      } | null> | null;
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

export type GetUsersQueryVariables = Exact<{
  organizationId: Scalars["BigInteger"];
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  usersOrganizationsByOrganizationId?: Array<{
    __typename?: "UserOrganizationGraphqlDTO";
    id?: any | null;
    role_type: RoleType;
    user_entity: {
      __typename?: "UserGraphqlDTO";
      id?: any | null;
      birth_date?: any | null;
      keycloak_email?: string | null;
      keycloak_first_name?: string | null;
      keycloak_id?: string | null;
      keycloak_last_name?: string | null;
      keycloak_username?: string | null;
      last_logged_in?: any | null;
      password?: string | null;
      follow_notification_enabled: boolean;
      message_notification_enabled: boolean;
      order_notification_enabled: boolean;
      product_notification_enabled: boolean;
    };
  } | null> | null;
};

export type GetUserwithOraganizationQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetUserwithOraganizationQuery = {
  __typename?: "Query";
  userWithOrganizationsAndUpdateLastLoggedInDate?: {
    __typename?: "UserGraphqlDTO";
    id?: any | null;
    birth_date?: any | null;
    keycloak_email?: string | null;
    keycloak_first_name?: string | null;
    keycloak_id?: string | null;
    keycloak_last_name?: string | null;
    keycloak_username?: string | null;
    last_logged_in?: any | null;
    password?: string | null;
    follow_notification_enabled: boolean;
    message_notification_enabled: boolean;
    order_notification_enabled: boolean;
    product_notification_enabled: boolean;
  } | null;
};

export type GetUserByKeycloakEmailQueryVariables = Exact<{
  keycloakEmail: Scalars["String"];
}>;

export type GetUserByKeycloakEmailQuery = {
  __typename?: "Query";
  usersByKeycloakEmail?: Array<{
    __typename?: "UserGraphqlDTO";
    id?: any | null;
    keycloak_first_name?: string | null;
    keycloak_last_name?: string | null;
    keycloak_email?: string | null;
    birth_date?: any | null;
    keycloak_username?: string | null;
    last_logged_in?: any | null;
    follow_notification_enabled: boolean;
    message_notification_enabled: boolean;
    order_notification_enabled: boolean;
    product_notification_enabled: boolean;
  } | null> | null;
};
