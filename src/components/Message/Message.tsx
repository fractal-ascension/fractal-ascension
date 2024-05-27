import { useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Message as MessageType, clearMessages, toggleTimestamp } from "./messageSlice";
import "./Message.scss";
import { ActivityTypes } from "../../Utils/Data/Locations";
import { fullStatNames, statAbbreviations } from "../../Utils/Data/Stats";
import { ItemTooltipUtil } from "../../Utils/Functions/ItemTooltipUtil";
import { Tooltip } from "react-tooltip";

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
          <div
            key={message.id}
            className="message-item"
            data-tooltip-id={`message-tooltip-${message.id}`}
            data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
              <span>
                {message.tooltip}
                {message.effect
                  ? message.effect.map((effect) =>
                      effect.id === ActivityTypes.StatChange
                        ? effect.effect.map((statChange) => (
                            <span key={statChange.stat}>
                              <hr />
                              {statChange.value > 0 ? "+" : ""}
                              {statChange.value} {fullStatNames[statAbbreviations[statChange.stat]]}
                            </span>
                          ))
                        : effect.id === ActivityTypes.ItemChange
                        ? effect.effect.map((itemChange) => <span key={itemChange.item.id}>{ItemTooltipUtil(itemChange.item)}</span>)
                        : null
                    )
                  : null}
              </span>
            )}
          >
            <span>
              {messages.showTimestamp && <span style={{ color: "GrayText" }}>[{message.timestamp}] </span>}
              {message.message}
            </span>
            {message.tooltip ? <Tooltip id={`message-tooltip-${message.id}`} className="message-tooltip" /> : null}
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
