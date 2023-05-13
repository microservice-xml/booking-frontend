import React from "react";
import classes from "./index.module.scss";

const CardItem: React.FC<{ name: string; desc: string; url: string }> = (
  props
) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["card"]}>
        <img src={props.url} alt={props.name} className={classes["backgroundCard"]} />
        <div className={classes["into"]}>
          <h1 className={classes["title"]}>{props.name}</h1>
          <p className={classes["desc"]}>{props.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
