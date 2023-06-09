import Card from "../../model/card";
import CardItem from "./Cards";
import "./index.scss";

const LandingArticle: React.FC<{ data: Card[] }> = (props) => {
  const getRow = (items: any) => {
    let result = [];
    for (let item of items) {
      result.push(
        <div className="cards__row--item double" key={item.url}>
          <CardItem name={item.name} desc={item.desc} url={item.url} />
        </div>
      );
    }
    return result;
  };
  return (
    <div className="cards">
      <div className="cards__header">
        <div className="cards__header--main">Popular destinations</div>
        <div className="cards__header--sub">
          Here are some of the most popular destinations all around the world.
        </div>
      </div>
      <div className="cards__row">
        {props.data && getRow(props.data.slice(0, 2))}
      </div>
      <div className="cards__row">
        {props.data && getRow(props.data.slice(2, 5))}
      </div>
    </div>
  );
};

export default LandingArticle;
