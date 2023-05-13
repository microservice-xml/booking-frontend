import React from 'react'
import InfoCard from './InfoCard'
import classes from './index.module.scss';

function InfoCards() {
  return (
    <div className={classes["cards-container"]}>
          <InfoCard
            title="Cheap Accommodations"
            routerUrl="/news"
            imgUrl={require("../../../../assets/images/icons/accommodation1.png")}
          />
          <InfoCard
            title="Latest blogs"
            routerUrl="/news"
            imgUrl={require("../../../../assets/images/icons/blogs.png")}
          />
          <InfoCard
            title="Explore the World"
            routerUrl="/news"
            imgUrl={require("../../../../assets/images/icons/planet.png")}
          />
    </div>
  )
}

export default InfoCards