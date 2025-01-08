export default function reducer(draft, action) {
  switch (action.type) {
    case "init":
      return action.data; // API 데이터를 초기 상태로 설정
    case "add":
      return [action.data, ...draft];
    case "edit":
      return draft.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "deleted":
      return draft.filter((item) => String(item.id) !== String(action.id));

    default:
      return draft;
  }
}
