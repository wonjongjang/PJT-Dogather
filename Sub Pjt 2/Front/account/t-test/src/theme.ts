import { DefaultTheme } from "styled-components";

const deviceSizes = {
  desktop: `1290px`,
};

const query = {
  desktop: `screen and (min-width: ${deviceSizes.desktop})`,
};

export const LightTheme: DefaultTheme = {
  query,
};
