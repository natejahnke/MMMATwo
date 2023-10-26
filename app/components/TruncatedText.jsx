export default function TruncatedText({ text }) {
    return (
      <div className="truncate">
        {text}
        <span className="tooltip">{text}</span>
      </div>
    );
  }
  