import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
export default function New() {
  const { handleCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  //일기 생성
  const onSubmit = (userInput) => {
    handleCreate(
      userInput.createdDate.getTime(),
      userInput.emotionId,
      userInput.content
    );
    nav("/", { replace: true });
  };
  return (
    <div>
      <Header
        title={"새 일기 작성하기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
      {/* <button
        onClick={() => {
          handleCreate(new Date().getTime(), 1, "Heekwon");
        }}
      >
        clicxk
      </button> */}
    </div>
  );
}
