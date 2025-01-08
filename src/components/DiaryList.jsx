import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./diarylist.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function DiaryList({ data }) {
  const [sortData, setSortData] = useState("latest");
  const nav = useNavigate();
  const handleChangeSortSelect = (e) => {
    setSortData(e.target.value);
  };
  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortData === "oldset") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };
  const sortedDataItem = getSortedData();
  return (
    <div className="diaryList">
      <div className="menu_bar">
        <select onChange={handleChangeSortSelect}>
          <option value={"latest"}>최신순</option>
          <option value={"oldset"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav(`/new`)}
          text={"새로운 일기 작성하기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {sortedDataItem.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
