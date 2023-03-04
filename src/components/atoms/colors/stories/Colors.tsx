import { theme } from "@/config/theme";
import { flattenObject } from "@/utils";

type Color = 'neutral' | 'shades' | 'accent_a' | 'accent_b' | 'accent_c' | 'success' | 'error' | 'gradients';

const colorDescription = {
  neutral:
    "These colors are used as supporting secondary colors in backgrounds, text colors, seperators, models, etc",
  shades: "These colors are black and white",
  accent_a: "These are accents colors",
  accent_b: "These are alternative accents colors",
  accent_c: "These are alternative accents colors",
  success:
    "These colors depict an emotion of positivity. Generally used across success, complete states.",
  error:
    "These colors depict an emotion of negativity. Generally used across error states.",
  gradients: "These colors are used as wherever gradients to be used.",
};

export const Colors = () => {
  const getColorName = (color: any) => {
    return color.replace(/_/g, " ");
  };

  const getColorPrefix = (colorArray: Array<string>) => {
    const colorPrefix: any = colorArray.map((color: string) => {
      const colorNameArray = color.split("_");

      if (colorNameArray.length > 1) {
        colorNameArray.pop();
      }

      const colorPrefix = colorNameArray.join("_");
      return colorPrefix;
    });

    // @ts-ignore
    const uniqueColorPrefix = [...new Set(colorPrefix)];

    return uniqueColorPrefix;
  };

  const filterColorByPrefix = (colorObject: any, prefix: any) => {
    const colorArray = Object.entries(colorObject).filter(([key, value]) =>
      key.startsWith(prefix)
    );

    return colorArray;
  };

  const colors = theme.colors;
  const gradients = theme.gradients;
  colors.gradients = gradients;
  const flattenedColors = flattenObject(colors);

  const colorsArr = getColorPrefix(Object.keys(flattenedColors));

  return (
    <div>
      {colorsArr?.map((color: Color) => (
        <div className="flex gap-6 mb-11" key={color}>
          <div className="color--name w-[250px] min-w-[250px]">
            <h3 className="text-[#1C1C1C] text-2xl font-medium m-0 capitalize">
              {getColorName(color)}
            </h3>
            <p className="text-[#666666] text-xs font-normal m-0">
              {colorDescription[color]}
            </p>
          </div>

          {filterColorByPrefix(flattenedColors, color)?.map(
            ([colorName, colorValue]: any[]) => (
              <div key={colorValue} className="">
                <div
                  className="h-[50px] w-[130px] text-xs text-[#1C1C1C] capitalize rounded-[5px] mb-1.5"
                  style={{ background: `${colorValue || ''}` }}
                ></div>
                <div className="flex justify-between capitalize">
                  <span className="text-xs">
                    {getColorName(colorName.replace(color, ""))}
                  </span>

                  {color !== "gradients" && (
                    <span className="text-xs">{colorValue?.toUpperCase()}</span>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};
