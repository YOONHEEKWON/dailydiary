import { useEffect, useState } from "react";
import Button from "./Button";
import "./editor.css";
import EmotionItem from "./EmotionItem";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let mydate = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (mydate < 10) {
    mydate = `0${mydate}`;
  }
  return `${year}-${month}-${mydate}`;
};
export default function Editor({ initData, onSubmit }) {
  const nav = useNavigate();
  const [userInput, setUserInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  useEffect(() => {
    if (initData) {
      setUserInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);
  const handleDate = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "createdDate") {
      value = new Date(value);
    }
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  const handleTextarea = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    onSubmit(userInput);
  };
  const handleCancel = () => {
    nav(-1);
  };
  return (
    <div className="editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          type="date"
          value={getStringDate(userInput.createdDate)}
          onChange={handleDate}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                handleDate({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === userInput.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          placeholder="오늘의 일기를 작성해주세요."
          name="content"
          value={userInput.content}
          onChange={handleTextarea}
        />
      </section>
      <section className="button_section">
        <Button text={"취소하기"} onClick={handleCancel} />
        <Button text={"완료"} type={"POSITIVE"} onClick={handleSubmit} />
      </section>
    </div>
  );
}
