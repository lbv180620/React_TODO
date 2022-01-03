// 56. タスクの戻す機能

import { useState } from "react";
import "./styles.css";
import sha256 from "crypto-js/sha256";

export const App = () => {
  //State
  const [todoText, setTodoText] = useState("");

  const [incompletedTodoList, setIncompletedTodoList] = useState([]);

  const [completedList, setCompletedList] = useState([]);

  // 関数
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAddBtn = () => {
    if (todoText === "") return;
    const newIncompletedTodoList = [
      ...addToTodoList(todoText, incompletedTodoList)
    ];
    setIncompletedTodoList(newIncompletedTodoList);
    setTodoText("");
  };

  const onClickDeleteBtn = (index) => {
    const newIncompletedTodoList = [
      ...deleteFromTodoList(index, incompletedTodoList)
    ];
    setIncompletedTodoList(newIncompletedTodoList);
  };

  const onClickCompleteBtn = (index) => {
    const newIncompletedTodoList = [
      ...deleteFromTodoList(index, incompletedTodoList)
    ];

    const newCompletedTodoList = [
      ...addToTodoList(incompletedTodoList[index], completedList)
    ];

    setIncompletedTodoList(newIncompletedTodoList);
    setCompletedList(newCompletedTodoList);
  };

  const onClickBackBtn = (index) => {
    const newCompletedList = [...deleteFromTodoList(index, completedList)];
    const newIncompletedTodoList = [
      ...addToTodoList(completedList[index], incompletedTodoList)
    ];

    setCompletedList(newCompletedList);
    setIncompletedTodoList(newIncompletedTodoList);
  };

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

  /**
   * TODOリストに作業項目を追加
   *
   * @param {todoAddNewly} string
   * @param {todoList} array
   * @return {newTodoList} array
   */
  const addToTodoList = (todoAddNewly, todoList) => {
    const newTodoList = [...todoList, todoAddNewly];
    return newTodoList;
  };

  /**
   * 文字列からハッシュ値を生成
   *
   * @param {string} str 文字列
   * @return {string} ハッシュ値
   */
  const generateHash = (str) => {
    return sha256(str);
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
            return (
              <li key={generateHash(todo)}>
                <div className="list-row">
                  <p>{todo}</p>
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
          {completedList.map((todo, index) => {
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
    </>
  );
};

/**
 * 今はDBとも特に絡んでないので、フロント側だけのStateで表現している感じだが、
 * 実際のアプリだと、押した行の要素に対して登録処理を走らせたり、
 * 削除ボタンを押して行の情報から要素を特定してその行を削除する処理を実行したりと、
 * 今の延長になるので、React開発の基礎なる。
 */
