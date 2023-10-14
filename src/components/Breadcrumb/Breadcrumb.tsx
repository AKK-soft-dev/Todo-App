import { Fragment } from "react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathSegments = pathname.split("/");
  const lastIndex = pathSegments.length - 1;
  return (
    <div className="mr-10 ">
      <div className="text-sm flex items-center space-x-1">
        <Link to="/" className="flex space-x-1 items-center">
          <HiHome className="text-base" />
          {pathname === "/" && (
            <>
              <span>|</span>
              <span>Dashboard</span>
            </>
          )}
        </Link>
        {pathname !== "/" &&
          pathSegments?.map(
            (segment, index) =>
              segment && (
                <Fragment key={segment}>
                  <span className="text-base">/ </span>
                  {index !== lastIndex ? (
                    <Link to="#" className="capitalize text-white/70">
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
      <h2 className="font-bold text-base capitalize">
        {pathname === "/" ? "Home" : pathSegments[lastIndex].replace("-", " ")}
      </h2>
    </div>
  );
};

export default Breadcrumb;
