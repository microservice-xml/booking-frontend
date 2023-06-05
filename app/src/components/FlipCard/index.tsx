import "./index.scss";

interface FlipCardProps {
  width: string;
  height: string;
  img: string;
  message: string;
  dateTime: string;
}

const FlipCard: React.FC<FlipCardProps> = (props: FlipCardProps) => {
  return (
    <div
      className="flip-card"
      style={{ width: props.width, height: props.height }}
    >
      <div className="flip-card-inner">
        <div
          className="flip-card-front"
          style={{
            backgroundImage: `url("${props.img}")`,
          }}
        ></div>
        <div className="flip-card-back">
          <div className="flip-card-back--datetime">{props.dateTime}</div>
          <div className="flip-card-back--title">Notification</div>
          <div className="flip-card-back--message">{props.message}</div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
