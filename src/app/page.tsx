import Advertising from "@/components/home/banners";
import Faction from "@/components/faction";
import News from "@/components/home/news";
import Benefits from "@/components/partners";
import Subscription from "@/components/subscription";
import Us from "@/components/home/us";

const page = () => {
  return (
    <>
      <div className="bg-midnight">
        <Advertising />
        <News />
        <Us />
        <Subscription />
        <Benefits />
        <Faction />
      </div>
    </>
  );
};

export default page;
