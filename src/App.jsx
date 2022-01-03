import { useState } from "react";
import "./styles.css";

export const App = () => {
  //State
  const [todoText, setTodoText] = useState("");

  const [incompletedTodoList, setIncompletedTodoList] = useState([
    { id: "1", name: "ああああ" },
    { id: "2", name: "いいいい" }
  ]);

  const [completedList, setCompletedList] = useState([
    { id: "3", name: "うううう" }
  ]);

  // 関数
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAddBtn = () => {
    if (todoText === "") return;
    const newTodo = { id: generateRandomString(), name: todoText };
    const newTodoList = [...incompletedTodoList, newTodo];
    setIncompletedTodoList(newTodoList);
    setTodoText("");
  };

  const generateRandomString = (
    num = 8,
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ) => {
    let result = "";
    const charsLength = chars.length;

    for (let i = 0; i < num; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return result;
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAddBtn}>追加</button>
      </div>
      <div className="incompleted-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompletedTodoList.map((todo) => {
            const { id, name } = todo;
            return (
              <li key={id}>
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
              <li key={id}>
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
