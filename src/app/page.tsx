import Advertising from "@/components/banners";
import Faction from "@/components/faction";
import News from "@/components/news";
import Benefits from "@/components/partners";
import Subscription from "@/components/subscription";
import Us from "@/components/us";

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
