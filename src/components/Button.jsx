import "./Button.css";
export default function Button({ text, type, onClick }) {
  return (
    <button className={`button button_${type} `} onClick={onClick}>
      {text}
    </button>
  );
}
