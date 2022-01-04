import React from "react";

// CSS
const style = {
  backgroundColor: "#c6ffe2",
  width: "400px",
  minHeight: "200px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const IncompletedTodoList = (props) => {
  // Props
  const {
    todoList,
    generateHash,
    onClickCompleteBtn,
    onClickDeleteBtn
  } = props;
  return (
    <div style={style}>
      <p className="title">未完了のTODO</p>
      <ul>
        {todoList.map((todo, index) => {
          return (
            <li key={generateHash(todo)}>
              <div className="list-row">
                <p>{todo}</p>
                <button onClick={() => onClickCompleteBtn(index)}>完了</button>
                <button onClick={() => onClickDeleteBtn(index)}>削除</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
