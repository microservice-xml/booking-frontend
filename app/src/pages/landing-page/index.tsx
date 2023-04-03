import Explore from "../../components/Explore";
import LandingArticle from "../../components/LandingArticle";
import Footer from "../../layouts/footer";
import "./index.scss";

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="landing__cards">
        <LandingArticle />
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
