import Advertising from "@/components/banners";
import News from "@/components/news";

const page = () => {
  return (
    <>
      <div className="bg-midnight">
        <Advertising />
        <div className="container">
          <News />
        </div>
      </div>
    </>
  );
};

export default page;
