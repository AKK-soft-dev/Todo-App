// import NotificationItem from "./NotificationItem";

// const notifications = [
//   {
//     id: 1,
//     linkTo: "#",
//     img_path: "/team-2.jpg",
//     message: "New message from Laur",
//     timeDistance: "3 mins ago",
//   },
//   {
//     id: 2,
//     linkTo: "#",
//     img_path: "/logo-spotify.svg",
//     message: "New album from Taylor Swift",
//     timeDistance: "1 day",
//   },
// ];

const Notification = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`absolute top-full -right-2 transition-all duration-200 ${
        open
          ? "opacity-100 -translate-y-5 z-40"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`mt-10 relative bg-white w-[300px] shadow-lg px-2 py-3 text-sm rounded-lg before:absolute before:w-0 before:h-0 before:border-8 before:right-2 before:border-e-transparent before:border-b-transparent before:rotate-45 before:border-white before:transition-all before:duration-300 before:delay-100 ${
          open ? "before:-top-1" : "before:top-0"
        }`}
      >
        <p className="text-xl text-red-500 font-bold py-10">
          Feature not ready!
        </p>
        {/* <ul className="space-y-1">
          {notifications.map((notification) => (
            <li key={notification.id}>
              <NotificationItem {...notification} />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Notification;
