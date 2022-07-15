import React from "react";
import { useLocation, useMatches } from "@remix-run/react";
import type { ColorScheme } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import styles from "./tailwind.css";
import { AnimatePresence } from "framer-motion";
let isMount = true;
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});
export default function App() {
  let location = useLocation();
  let matches = useMatches();

  React.useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location]);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/resources/manifest.webmanifest" />
        <Meta /> <Links />
      </head>
      <body className="font-man">
        <AnimatePresence exitBeforeEnter>
          <MantineTheme>
            <Outlet />
          </MantineTheme>
        </AnimatePresence>
        <ScrollRestoration /> <Scripts /> <LiveReload />
      </body>
    </html>
  );
}
function MantineTheme({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withNormalizeCSS
        withGlobalStyles
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
