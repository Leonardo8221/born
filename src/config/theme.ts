import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { fonts } from "./fonts";
import { shadows } from "./shadows";
import { gradients } from "./gradients";

const fullConfig: any = resolveConfig(tailwindConfig);

export const theme = {
  colors: fullConfig.theme.colors,
  fonts,
  shadows,
  gradients,
};
