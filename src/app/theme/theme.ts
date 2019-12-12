export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--foreground-default": "#090a08",
    "--foreground-secondary": "#41474D",
    "--foreground-tertiary": "#7c8079",
    "--foreground-quaternary": "#f9fff4",
    "--foreground-light": "#484d41",

    "--background-default": "#FFFFFF",
    "--background-secondary": "#d3e2c7",
    "--background-tertiary": "#5c9966",

    "--background-mat-card": "#FFFFFF",

    "--primary-default": "#7846a1",
    "--primary-dark": "#603880",
    "--primary-light": "#936ab3",

    "--accent-default": "#5dfdcb",
    "--accent-dark": "#24b286",
    "--accent-light": "#b2ffe7",

    "--text-primary": "#000000",
    "--text-sub": "#777",

    "--icon-search": "#8bb36a",

    "--slider-thumb": "#603880",
    "--slider-bar": "#a378c4",

    "--error-default": "#EF3E36",
    "--error-dark": "#800600",
    "--error-light": "#FFCECC",

    "--background-tertiary-shadow": "0 2rem 6rem rgba(0,0,0,.3)"
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--foreground-default": "#5C7D99",
    "--foreground-secondary": "#A3B9CC",
    "--foreground-tertiary": "#F4FAFF",
    "--foreground-quaternary": "#E5E5E5",
    "--foreground-light": "#FFFFFF",

    "--background-default": "#41474D",
    "--background-secondary": "#41474D",
    "--background-tertiary": "#08090A",

    "--background-mat-card": "#666b70",

    "--primary-default": "#5dfdcb",
    "--primary-dark": "#24b286",
    "--primary-light": "#603880",

    "--accent-default": "#7846a1",
    "--accent-dark": "#603880",
    "--accent-light": "#936ab3",

    "--text-primary": "#FFFFFF",
    "--text-sub": "#d9dadb",

    "--icon-search": "#8bb36a",

    "--slider-thumb": "#24b286",
    "--slider-bar": "#b2ffe7",

    "--error-default": "#EF3E36",
    "--error-dark": "#800600",
    "--error-light": "#FFCECC",

    "--background-tertiary-shadow": " 0 2rem 5rem rgba(0,0,0,.06)"
  }
};