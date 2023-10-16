import Next30Days from "../components/Home/Next30Days/Next30Days";
import Next7Days from "../components/Home/Next7Days/Next7Days";
import Today from "../components/Home/Today/Today";
import Tomorrow from "../components/Home/Tomorrow/Tomorrow";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Today />
      <Tomorrow />
      <Next7Days />
      <Next30Days />
    </div>
  );
};

export default HomePage;
