import autoAnimate from "@formkit/auto-animate";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type AlertProps = {
  show: boolean;
  warnType?: boolean;
  message: string;
};

export type AlertMethods = {
  scrollIntoView: () => void;
};

const Alert = forwardRef<AlertMethods, AlertProps>(
  ({ message, show, warnType }, ref) => {
    const parent = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
      scrollIntoView: () => {
        parent.current?.scrollIntoView();
      },
    }));

    useEffect(() => {
      parent.current && autoAnimate(parent.current);
    }, []);

    return (
      <div role="alert" ref={parent}>
        {show && (
          <p
            className={`px-5 py-3 text-sm  rounded my-2 font-semibold border ${
              warnType
                ? "text-yellow-500 bg-yellow-50 border-yellow-500"
                : "text-red-500 bg-red-50 border-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);

export default Alert;
