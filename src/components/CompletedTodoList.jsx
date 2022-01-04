import React from "react";

export const CompletedTodoList = (props) => {
  const { todoList, generateHash, onClickBackBtn } = props;
  return (
    <div className="completed-area">
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
