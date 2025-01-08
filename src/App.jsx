import { useReducer, useEffect, useRef, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import reducer from "./reducer/reducer";
import { mockData } from "./util/mockData";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(mockData.length + 1);
  // localStorage.setItem("test", "hi?");

  //랜덤덤 명언 API 호출 후 데이터 업데이트
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const updatedData = await Promise.all(
          mockData.map(async (item) => {
            const response = await fetch(
              "https://korean-advice-open-api.vercel.app/api/advice"
            ); //랜덤 명언
            if (!response.ok) {
              throw new Error("error");
            }
            const quoteData = await response.json();
            console.log(quoteData.message);
            return {
              ...item,
              content: quoteData.message, //랜덤 명언으로 대체
            };
          })
        );
        dispatch({ type: "init", data: updatedData }); // 초기화 액션 디스패치
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);
  //로딩중 처리
  if (data.length === 0) return <div>Loading...</div>;

  // Add 기능
  const handleCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "add",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // Edit 기능
  const handleEdit = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "edit",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // Delete 기능
  const handleDeleted = (id) => {
    console.log("Deleting ID:", id);
    dispatch({
      type: "deleted",
      id,
    });
  };

  return (
    <DiaryStateContext.Provider value={{ data }}>
      <DiaryDispatchContext.Provider
        value={{
          handleCreate,
          handleDeleted,
          handleEdit,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<Notfound />} /> {/* page가 없을 때 */}
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
