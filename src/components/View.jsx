import "./view.css";
import getEmotionImage from "../util/get-emotion-icon";
import { emotionList } from "../util/constants";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { useContext } from "react";
import { useParams } from "react-router-dom";
export default function View({ emotionId, content }) {
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );
  return (
    <div className="view">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
}
