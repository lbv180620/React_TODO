import React from "react";

export const IncompletedTodoList = (props) => {
  // Props
  const {
    todoList,
    generateHash,
    onClickCompleteBtn,
    onClickDeleteBtn
  } = props;
  return (
    <div className="incompleted-area">
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
