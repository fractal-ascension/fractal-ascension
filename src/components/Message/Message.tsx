import { useRef, useEffect } from "react";
import "./Message.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Message as MessageType, clearMessages, toggleTimestamp } from "./messageSlice";

const Message = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.message);

  // Creating a ref for the message body
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to bottom whenever messages update
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.messages]); // Dependency on messages, so it runs every time they change

  return (
    <div className="message-container">
      <div className="message-header">
        <p>Message Log</p>
      </div>
      <div className="message-body">
        {messages.messages.map((message: MessageType) => (
          <div key={message.id} className="message-item">
            <span>
              {messages.showTimestamp && (
                <span style={{ color: "GrayText" }}>[{message.timestamp}] </span>
              )}
              {message.message}
            </span>
          </div>
        ))}
        {/* Invisible element to mark the end of messages */}
        <div ref={messageEndRef} />
      </div>
      <button onClick={() => dispatch(toggleTimestamp())}>Toggle Timestamp</button>
      <button onClick={() => dispatch(clearMessages())}>Clear Messages</button>
    </div>
  );
};

export default Message;
