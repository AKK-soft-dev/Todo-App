import { Fragment } from "react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

const Breadcrumb = ({ overrideItems }: { overrideItems?: string[] }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathSegments = pathname.split("/");
  const lastIndex = pathSegments.length - 1;
  return (
    <div className="text-sm flex items-center space-x-1">
      <Link to="/" className="flex space-x-1 items-center">
        <HiHome className="text-base" />
      </Link>
      {pathname !== "/" &&
        (overrideItems || pathSegments)?.map(
          (segment, index) =>
            segment && (
              <Fragment key={segment}>
                <span className="text-base">
                  <HiChevronRight />{" "}
                </span>
                {index !== lastIndex ? (
                  <Link
                    to="#"
                    className="capitalize hover:underline duration-200"
                  >
                    {segment.replace("-", " ")}
                  </Link>
                ) : (
                  <span className="capitalize">
                    {segment.replace("-", " ")}
                  </span>
                )}
              </Fragment>
            )
        )}
    </div>
  );
};

export default Breadcrumb;
