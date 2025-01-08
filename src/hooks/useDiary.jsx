import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
const useDiary = (id) => {
  const { data } = useContext(DiaryStateContext);
  const [crDiaryItem, setCrDiaryItem] = useState();
  const nav = useNavigate();
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert("잘못된 페이지 입니다.");
      nav("/", { replace: true });
    }
    setCrDiaryItem(currentDiaryItem);
  }, [id, data, nav]);
  return crDiaryItem;
};

export default useDiary;
