// 55. タスクの完了機能

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
    // const newTodo = { id: generateRandomString(), name: todoText };
    // const newTodoList = [...incompletedTodoList, newTodo];
    const newIncompletedTodoList = addToTodoList(todoText, incompletedTodoList);
    setIncompletedTodoList(newIncompletedTodoList);
    setTodoText("");
  };

  const onClickDeleteBtn = (index) => {
    // const newTodoList = [...incompletedTodoList];
    // newTodoList.splice(index, 1);
    const newIncompletedTodoList = [
      ...deleteFromTodoList(index, incompletedTodoList)
    ];
    setIncompletedTodoList(newIncompletedTodoList);
  };

  const onClickCompleteBtn = (index) => {
    // 未完了リストから対象の項目を削除した新しい未完了リストを生成
    const newIncompletedTodoList = [
      ...deleteFromTodoList(index, incompletedTodoList)
    ];
    // 未完了リストから削除予定の項目を追加した新しい完了リストを生成
    const newCompletedTodoList = [
      ...addToTodoList(incompletedTodoList[index], completedList)
    ];

    // 実際に未完了リストから削除
    setIncompletedTodoList(newIncompletedTodoList);
    // 実際に完了リストに追加
    setCompletedList(newCompletedTodoList);

    // addToTodoList();
  };

  // /**
  //  * TODOリストから作業項目を削除
  //  *
  //  * @param {index} number
  //  * @param {todoList} array 状態変数
  //  * @param {callback} func 更新関数
  //  */
  // const deleteFromTodoList = (index, todoList, callback) => {
  //   const newTodoList = [...todoList];
  //   newTodoList.splice(index, 1);
  //   // 引数にコールバック関数が指定されていない場合、何もしない関数を返す
  //   const cb =
  //     callback ||
  //     function () {
  //       return;
  //     };
  //   cb(newTodoList);
  // };
  /**
   * TODOリストから作業項目を削除
   *
   * @param {index} number
   * @param {todoList} array 状態変数
   * @return {newTodoList} array
   */
  const deleteFromTodoList = (index, todoList) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    return newTodoList;
  };

  // /**
  //  *TODOリストに作業項目を追加
  //  *
  //  * @param {todoAddNewly} string
  //  * @param {todoList} array
  //  * @param {cb} func
  //  */
  // const addToTodoList = (todoAddNewly, todoList, cb) => {
  //   const newTodo = { id: generateRandomString(), name: todoAddNewly };
  //   const newTodoList = [...todoList, newTodo];
  //   cb(newTodoList);
  // };
  /**
   * TODOリストに作業項目を追加
   *
   * @param {todoAddNewly} string
   * @param {todoList} array
   * @return {newTodoList} array
   */
  const addToTodoList = (todoAddNewly, todoList) => {
    const newTodo = { id: generateRandomString(), name: todoAddNewly };
    const newTodoList = [...todoList, newTodo];
    return newTodoList;
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
          {incompletedTodoList.map((todo, index) => {
            const { id, name } = todo;
            return (
              <li key={id}>
                <div className="list-row">
                  <p>{name}</p>
                  {/* 完了ボタンも行番号の情報が必要になるので、アロー関数で正しく関数を指定 */}
                  <button onClick={() => onClickCompleteBtn(index)}>
                    完了
                  </button>
                  <button onClick={() => onClickDeleteBtn(index)}>削除</button>
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

/**
 * Objects are not valid as a React child (found: object with keys {id, name}).
 * If you meant to render a collection of children, use an array instead.
 *
 * オブジェクトはダメみたい
 */
