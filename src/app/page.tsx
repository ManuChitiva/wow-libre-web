import Advertising from "@/components/banners";
import Faction from "@/components/faction";
import News from "@/components/news";
import Partners from "@/components/partners";
import Subscription from "@/components/subscription";
import Us from "@/components/us";

const page = () => {
  return (
    <>
      <div className="bg-midnight">
        <Advertising />
        <div className="container m-5">
          <News />
        </div>
        <Us />
        <Subscription />
        <Partners />
        <Faction />
      </div>
    </>
  );
};

export default page;
