import { useDispatch, useSelector } from "react-redux";
import "./Message.scss";
import { RootState } from "../../store";
import { Message as MessageType, clearMessages, toggleTimestamp } from "./messageSlice"; // Rename to avoid conflict with component name

const Message = () => {
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
      <button onClick={() => dispatch(clearMessages())}>Clear Messages</button>
    </div>
  );
};

export default Message;
