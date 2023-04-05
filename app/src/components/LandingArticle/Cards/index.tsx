import React from "react";
import "./index.scss";
const CardItem: React.FC<{ name: string; desc: string; url: string }> = (
  props
) => {
  return (
    <div className="container">
      <div className="card">
        <img src={props.url} alt={props.name} />
        <div className="into">
          <h1>{props.name}</h1>
          <p>{props.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
