// app/ThemeRegistry.tsx
"use client";
import { extendTheme } from "@mui/joy/styles";

export const baseTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: "#231f20",
          surface: "#1a1717"
        },
      },
    },
  },
});
