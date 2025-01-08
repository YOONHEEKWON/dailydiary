import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import View from "../components/View";
import useDiary from "../hooks/useDiary";
import { getStringDate } from "../util/getStringData";
export default function Diary(props) {
  const nav = useNavigate();
  const params = useParams();
  const crDiaryItem = useDiary(params.id);
  if (!crDiaryItem) {
    return <div>데이터 로딩중...</div>;
  }
  const { createdDate, emotionId, content } = crDiaryItem;
  const titleDate = getStringDate(new Date(createdDate));
  console.log(crDiaryItem);
  const handleBack = () => {
    nav(-1);
  };
  const handleModify = () => {
    nav(`/edit/${params.id}`);
  };
  return (
    <div>
      <Header
        title={`${titleDate} 기록`}
        leftChild={<Button text={"<"} onClick={handleBack} />}
        rightChild={<Button text={"수정하기"} onClick={handleModify} />}
      />
      <View emotionId={emotionId} content={content} />
    </div>
  );
}
