import { Fragment, useEffect, useRef } from "react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { LinksInBreadCrumbType } from "./types";
import autoAnimate from "@formkit/auto-animate";

const Breadcrumb = ({
  overrideItems,
}: {
  overrideItems: LinksInBreadCrumbType;
}) => {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  const lastIndex = overrideItems.length - 1;
  return (
    <div ref={parent} className="text-sm flex items-center flex-wrap gap-1">
      <Link to="/" className="flex space-x-1 items-center">
        <HiHome className="text-base" />
      </Link>
      {overrideItems?.map(
        (segment, index) =>
          segment && (
            <Fragment key={segment.id}>
              <span className="text-base">
                <HiChevronRight />{" "}
              </span>
              {index !== lastIndex ? (
                <Link
                  to={`/categories/${segment.id}`}
                  className="capitalize font-semibold hover:underline duration-200"
                >
                  {segment.name}
                </Link>
              ) : (
                <span className="capitalize">
                  {segment.name || segment.title}
                </span>
              )}
            </Fragment>
          )
      )}
    </div>
  );
};

export default Breadcrumb;
