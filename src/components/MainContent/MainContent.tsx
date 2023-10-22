import autoAnimate from "@formkit/auto-animate";
import { useRef, useEffect } from "react";

const MainContent = ({
  expand,
  children,
}: {
  expand: boolean;
  children: React.ReactNode;
}) => {
  const parent = useRef<HTMLElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  return (
    <main
      ref={parent}
      className={`pt-16 px-4 transition-all duration-300 h-full overflow-x-hidden flex-1${
        expand ? `open-side_menu` : ""
      }`}
    >
      {children}
    </main>
  );
};

export default MainContent;
