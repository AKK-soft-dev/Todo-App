import { Fragment } from "react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { LinksInBreadCrumbType } from "./types";

const Breadcrumb = ({
  overrideItems,
}: {
  overrideItems: LinksInBreadCrumbType;
}) => {
  const lastIndex = overrideItems.length - 1;
  return (
    <div className="text-sm flex items-center space-x-1">
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
                  className="capitalize hover:underline duration-200"
                >
                  {segment.name}
                </Link>
              ) : (
                <span className="capitalize">{segment.name}</span>
              )}
            </Fragment>
          )
      )}
    </div>
  );
};

export default Breadcrumb;
