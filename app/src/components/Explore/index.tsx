import { useContext, useEffect, useState } from "react";
import RecommendationCard from "./card";
import "./index.scss";
import AuthContext from "../../context/AuthContext";
import { recommend } from "../../services/recommendationService";
import { WarningMessage } from "../../utils/toastService/toastService";
import Recommendation from "../../model/recommedation";

const Explore = () => {

  const ctx = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const id = +ctx.user?.id;


  useEffect(() => {
    fetchData();
  }, [id])

  const fetchData = async() => {
    let response = await recommend(ctx.user?.id as any);

    if (!response || !response.data) {
      return;
    }

    setRecommendations(response.data);
  }

  const renderCards = () => {
    if (!recommendations || recommendations?.length === 0) {
      return (<p className="large-text-p">Please make your first reservation so we can recommend what is best for you</p>)
    }

    let result = [];
    for (let acc of recommendations) {
      result.push(<RecommendationCard key={acc.id} imgPath={"./images/" + acc.id + ".jpg"} name={acc.name} location={acc.location} avgGrade={acc.avgGrade} />)
    }

    return result;
  }

  return (
    <div className="explore">
      <div className="explore__header">
        <div className="explore__header--main">Recommended for you</div>
        <div className="explore__header--sub">
          These popular destinations have a lot to offer
        </div>
      </div>
      <div className="explore__main" style={{minHeight: recommendations?.length === 0 ? '2rem' : '40rem'}}>
        {renderCards()}
      </div>
    </div>
  );
};

export default Explore;
