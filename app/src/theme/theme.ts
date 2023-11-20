export interface Theme {
  baseSpace: number;
  palette: {
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    background: {
      default: string;
      secondary: string;
    };
    default: string;
    secondary: string;
    tertiary: string;
  };
}

export const theme: Theme = {
  baseSpace: 4,
  palette: {
    primary: {
      main: "#027A48",
      light: "#027A48",
      dark: "#000000",
      contrastText: "#fff",
    },
    background: {
      default: "#fff",
      secondary: "#F5F6F9",
    },
    default: "#141414",
    secondary: "#66737F",
    tertiary: "#D5DDE5",
  },
};
