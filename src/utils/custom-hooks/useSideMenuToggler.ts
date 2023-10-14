import { useEffect, useRef, useState } from "react";
import VW, { MediaQuery } from "vw-detector";

const { matchesMediaQuery, subscribeMediaQuery } = VW;

export default function useSideMenuToggler(mediaQuery: MediaQuery) {
  // Will initially return true if the viewport is xl screen
  const [openSideMenu, setOpenSideMenu] = useState(
    matchesMediaQuery(mediaQuery)
  );

  // To prevent setting same value multiple times.
  const prevMatches = useRef(openSideMenu);
  // Check if we explicitly toggled. If so, we won't need to handle responsive things.
  const toggled = useRef(false);

  const toggleSideMenu = () => {
    // Mark toggled
    if (!toggled.current) {
      toggled.current = true;
    }
    setOpenSideMenu((prev) => !prev);
  };

  // We need to stringify media query to pass it into useEffect deps because breakpoints utility functions return array type..
  // It will be new reference on every renders.
  const stringifiedMediaQuery = JSON.stringify(mediaQuery);

  useEffect(() => {
    const unsubscribe = subscribeMediaQuery(
      JSON.parse(stringifiedMediaQuery), // We need to parse stringified media query to transform it into array.
      (matches) => {
        if (prevMatches.current !== matches) {
          prevMatches.current = matches;
          if (!toggled.current) {
            setOpenSideMenu(matches);
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [stringifiedMediaQuery, subscribeMediaQuery]);

  return { openSideMenu, toggleSideMenu };
}
