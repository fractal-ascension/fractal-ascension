import { useDispatch, useSelector } from "react-redux";
import "./Message.scss";
import { RootState } from "../../store";
import {
  Message as MessageType,
  initialState,
  toggleTimestamp,
  addMessage,
} from "./messageSlice"; // Rename to avoid conflict with component name

const Message = () => {
  const dispatch = useDispatch();
  let { messages, showTimestamp } = useSelector((state: RootState) => state.message);

  messages = messages ? messages : initialState.messages;
  showTimestamp = showTimestamp ? showTimestamp : initialState.showTimestamp;

  return (
    <div className="message-container">
      <div className="message-header">
        <p>Message Log</p>
      </div>
      <div className="message-body">
        {messages.map((message: MessageType) => (
          <div key={message.id} className="message-item">
            <p>
              {showTimestamp && (
                <span style={{ color: "GrayText" }}>
                  [{new Date(message.timestamp).toLocaleTimeString()}]{" "}
                </span>
              )}
              {message.message}
            </p>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(toggleTimestamp())}>Toggle Timestamp</button>
      <button onClick={() => console.log(messages)}>Console</button>
      <button onClick={() => dispatch(addMessage({ id: 1, message: "test" }))}>Add Message</button>
    </div>
  );
};

export default Message;
