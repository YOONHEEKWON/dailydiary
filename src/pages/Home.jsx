import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";

export default function Home() {
  const getMonthlyData = (titleDate, data) => {
    const beginTime = new Date(
      titleDate.getFullYear(),
      titleDate.getMonth(),
      1,
      0,
      0,
      0
    ).getTime();
    const endTime = new Date(
      titleDate.getFullYear(),
      titleDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();
    return data.filter(
      (item) => beginTime <= item.createdDate && item.createdDate <= endTime
    );
  };
  const { data } = useContext(DiaryStateContext);
  const [titleDate, setTitleDate] = useState(new Date());
  const monthlyData = getMonthlyData(titleDate, data);
  const handlePrevDate = (month) => {
    if (month === "+") {
      setTitleDate(new Date(titleDate.getFullYear(), titleDate.getMonth() + 1)); // 월 증가
    } else {
      setTitleDate(new Date(titleDate.getFullYear(), titleDate.getMonth() - 1)); // 월 감소
    }
  };
  return (
    <div>
      <Header
        title={`${titleDate.getFullYear()}년 ${titleDate.getMonth() + 1}월`}
        leftChild={
          <Button
            text={"<"}
            onClick={() => {
              handlePrevDate("-");
            }}
          />
        }
        rightChild={
          <Button
            text={">"}
            onClick={() => {
              handlePrevDate("+");
            }}
          />
        }
      />
      <DiaryList data={monthlyData} />
    </div>
  );
}
