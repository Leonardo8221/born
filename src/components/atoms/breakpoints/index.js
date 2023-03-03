export const breakpoints = {
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1440px',
};

export const media = {
  /**
   * Styling props for everything above the `xs` breakpoint.
   */
  xs: `@media screen and (max-width: ${breakpoints.xs})`,
  /**
   * Styling props for everything above the `sm` breakpoint.
   */
  sm: `@media screen and (max-width: ${breakpoints.sm})`,
  /**
   * Styling props for everything above the `md` breakpoint.
   */
  md: `@media screen and (max-width: ${breakpoints.md})`,
  /**
   * Styling props for everything above the `lg` breakpoint.
   */
  lg: `@media screen and (max-width: ${breakpoints.lg})`,
  /**
   * Styling props for everything above the `xl` breakpoint.
   */
  xl: `@media screen and (max-width: ${breakpoints.xl})`,
  /**
   * Styling props for everything above the `xxl` breakpoint.
   */
  xxl: `@media screen and (max-width: ${breakpoints.xl})`,
};
