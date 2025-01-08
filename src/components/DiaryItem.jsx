import getEmotionImage from "../util/get-emotion-icon";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./diaryItem.css";
export default function DiaryItem({ id, emotionId, createdDate, content }) {
  const nav = useNavigate();
  return (
    <div className="diaryItem">
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_box img_box_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div onClick={() => nav(`/diary/${id}`)} className="info_box">
        <div className="info_box_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="info_box_content">{content}</div>
      </div>
      <div className="btn_box">
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정"} />
      </div>
    </div>
  );
}
