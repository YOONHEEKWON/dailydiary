import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";
export default function Edit() {
  const { handleDeleted, handleEdit } = useContext(DiaryDispatchContext);

  const params = useParams();
  const nav = useNavigate();

  const crDiaryItem = useDiary(params.id);
  const handleBack = () => {
    nav(-1);
  };

  const handleDelete = () => {
    console.log("params.id:", params.id); // 확인용 로그
    if (window.confirm("정말 일기를 삭제하시겠어요?")) {
      handleDeleted(params.id); // 삭제 로직 실행
      nav("/", { replace: true }); // 홈으로 이동
    }
  };

  const onSubmit = (userInput) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      handleEdit(
        params.id,
        userInput.createdDate.getTime(),
        userInput.emotionId,
        userInput.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"<"} onClick={handleBack} />}
        rightChild={
          <Button text={"삭제하기"} type={"NEGATIVE"} onClick={handleDelete} />
        }
      />
      <Editor initData={crDiaryItem} onSubmit={onSubmit} />
    </div>
  );
}
