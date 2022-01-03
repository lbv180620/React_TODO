import { useState } from "react";
import "./styles.css";

export const App = () => {
  //State
  const [incompletedTodoList, setIncompletedTodoList] = useState([
    { id: 1, name: "ああああ" },
    { id: 2, name: "いいいい" }
  ]);

  const [completedList, setCompletedList] = useState([
    { id: 1, name: "うううう" }
  ]);

  return (
    <>
      <div className="input-area">
        <input placeholder="TODOを入力" />
        <button>追加</button>
      </div>
      <div className="incompleted-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompletedTodoList.map((todo) => {
            const { id, name } = todo;
            return (
              <li key={id.toString()}>
                <div className="list-row">
                  <p>{name}</p>
                  <button>完了</button>
                  <button>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="completed-area">
        <p className="title">完了したTODO</p>
        <ul>
          {completedList.map((todo) => {
            const { id, name } = todo;
            return (
              <li key={id.toString()}>
                <div className="list-row">
                  <p>{name}</p>
                  <button>戻す</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
