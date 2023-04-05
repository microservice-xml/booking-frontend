import Card from "../../model/card";
import CardItem from "./Cards";
import "./index.scss";

const LandingArticle: React.FC<{ data: Card[] }> = (props) => {
  const getRow = (items: any) => {
    let result = [];
    for (let item of items) {
      result.push(
        <div className="cards__row--item double">
          <CardItem name={item.name} desc={item.desc} url={item.url} />
        </div>
      );
    }
    return result;
  };
  return (
    <div className="cards">
      <div className="cards__row">
        {/* <div className="cards__row--item double">
          <CardItem
            name={props.data[0].name}
            desc={props.data[0].desc}
            url={props.data[0].url}
          />
        </div>
        <div className="cards__row--item double">
          <CardItem
            name={props.data[1].name}
            desc={props.data[1].desc}
            url={props.data[1].url}
          />
        </div> */}
        {props.data && getRow(props.data.slice(0, 2))}
      </div>
      <div className="cards__row">
        {props.data && getRow(props.data.slice(2, 5))}
      </div>
    </div>
  );
};

export default LandingArticle;
