import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialState, updateCharacterName } from "./characterSlice";
import { RootState } from "../../store";

const CharacterName = () => {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);
  const [name, setName] = useState(character.name);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameRef.current && nameRef.current.textContent !== name) {
      nameRef.current.textContent = name;
    }
  }, [name]);

  const handleBlur = () => {
    const newName = nameRef.current?.textContent?.trim() || initialState.name;
    if (newName !== character.name) {
      dispatch(updateCharacterName(newName));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nameRef.current?.blur();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setName(character.name);
      nameRef.current?.blur();
    }
  };

  const handleNameEdit = (e: React.FormEvent<HTMLDivElement>) => {
    setName(e.currentTarget.textContent || "");
  };

  return (
    <div
      className="editable-text"
      ref={nameRef}
      contentEditable={true}
      onBlur={handleBlur}
      onInput={handleNameEdit}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning={true}
      spellCheck={false}
    >
      {character.name ? character.name : initialState.name}
    </div>
  );
};

export default CharacterName;
