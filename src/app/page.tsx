import Advertising from "@/components/banners";
import Casino from "@/components/casino";
import Navbar from "@/components/navbar";
import News from "@/components/news";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="bg-midnight">
        <Advertising />
        <div className="container">
          <News />
        </div>
        <Casino />
      </div>
    </>
  );
};

export default page;
