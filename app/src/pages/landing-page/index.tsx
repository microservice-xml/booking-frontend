import { useEffect, useState } from "react";
import Explore from "../../components/Explore";
import LandingArticle from "../../components/LandingArticle";
import Footer from "../../layouts/footer";
import Card from "../../model/card";
import { getCards } from "../../services/landingService";
import "./index.scss";
import SearchComponent from "../../components/SearchComponent";
import InfoCards from "./partials/InfoCards";

const LandingPage = () => {
  const [data, setData] = useState<Card[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getCards();
    setData(response as any);
  }
  return (
    <div className="landing">
      <div className="landing__search">
        <SearchComponent />
      </div>
      <div className="landing__info">
        <InfoCards />
      </div>
      <div className="landing__cards">
        <LandingArticle data={data} />
      </div>
      <div className="landing__explore">
        <Explore />
      </div>
      <div className="landing__footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
