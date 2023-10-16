import { Link } from "react-router-dom";
import { BsFillClockFill } from "react-icons/bs";

const NotificationItem = ({ linkTo, img_path, message, timeDistance }: any) => {
  return (
    <Link
      to={linkTo}
      className="flex px-4 py-3 hover:bg-slate-100 transition-all duration-100 rounded-xl space-x-3"
    >
      <div className="w-10 h-10 rounded-lg bg-black select-none">
        <img src={img_path} alt="team-2" className="w-full h-full rounded-lg" />
      </div>
      <div className="space-y-1 select-none">
        <h3 className="font-medium">{message}</h3>
        <div className="text-xs flex space-x-2 items-center text-black/50 font-medium">
          <BsFillClockFill />
          <span>{timeDistance}</span>
        </div>
      </div>
    </Link>
  );
};

export default NotificationItem;
