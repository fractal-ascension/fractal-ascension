import { useDispatch, useSelector } from "react-redux";
import "./Message.scss";
import { RootState } from "../../store";
import { Message as MessageType, toggleTimestamp, addMessage } from "./messageSlice"; // Rename to avoid conflict with component name

interface MessageTimeProps {
  hour: number;
  minute: number;
  ampm: string;
}

const Message = ({ hour, minute, ampm }: MessageTimeProps) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.message);

  return (
    <div className="message-container">
      <div className="message-header">
        <p>Message Log</p>
      </div>
      <div className="message-body">
        {messages.messages.map((message: MessageType) => (
          <div key={message.id} className="message-item">
            <p>
              {messages.showTimestamp && (
                <span style={{ color: "GrayText" }}>[{message.timestamp}] </span>
              )}
              {message.message}
            </p>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(toggleTimestamp())}>Toggle Timestamp</button>
      <button onClick={() => console.log(messages.messages)}>Console</button>
      <button
        onClick={() =>
          dispatch(
            addMessage({
              id: 1,
              timestamp: `${hour.toString().padStart(2, "0")}:${minute
                .toString()
                .padStart(2, "0")} ${ampm}`,
              message: "Skbd toiley.",
            })
          )
        }
      >
        Add Message
      </button>
    </div>
  );
};

export default Message;
