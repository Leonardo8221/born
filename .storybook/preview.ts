import "../src/app/globals.css";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      values: [
        {
          name: "gray",
          value: "#f8f8f8",
        },
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#666666",
        },
      ],
    },
  },
};

export default preview;
