import { useState } from "react";

export default function Player({ name, symbol, isActive, onEditPlayer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const clickHandler = () => {
    setIsEditing((edit) => !edit);
    if (isEditing) {
      onEditPlayer(symbol, newName);
    }
  };
  const changeHandler = (event) => setNewName(event.target.value);
  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      clickHandler();
    }
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            autoFocus
          />
        ) : (
          <span className="player-name">{newName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={clickHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
