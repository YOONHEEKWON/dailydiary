import getEmotionImage from "../util/get-emotion-icon";
import "./emotionitem.css";

export default function EmotionItem({
  emotionId,
  emotionName,
  isSelected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`emotionitem ${
        isSelected ? `emotionitem_on_${emotionId}` : ""
      }`}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
}
