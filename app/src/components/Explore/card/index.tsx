import React from 'react'
import './index.scss';

interface RecommendationCardProps {
  imgPath: string;
  name: string;
  location: string;
  avgGrade: number;
}

function RecommendationCard(props : RecommendationCardProps) {
  return (
    <div className="recommendation-card">
          <div className="recommendation-card__header">
            <img src={props.imgPath} alt={props.name}/>
          </div>
          <div className="recommendation-card__subheader">
            <div className='recommendation-card__subheader--name'>
              {props.name}
            </div>
            <div className='recommendation-card__subheader--location'>
              {props.location}
            </div>
            <div className='recommendation-card__subheader--grade'>
              {props.avgGrade}
            </div>
          </div>
    </div>
  )
}

export default RecommendationCard