import React from "react";

// CSS
const style = {
  backgroundColor: "#ffffe0",
  width: "400px",
  minHeight: "200px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const CompletedTodoList = (props) => {
  const { todoList, generateHash, onClickBackBtn } = props;
  return (
    <div style={style}>
      <p className="title">完了したTODO</p>
      <ul>
        {todoList.map((todo, index) => {
          return (
            <li key={generateHash(todo)}>
              <div className="list-row">
                <p>{todo}</p>
                <button onClick={() => onClickBackBtn(index)}>戻す</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
