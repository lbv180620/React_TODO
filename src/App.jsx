// 57. カイゼン(コンポーネント化)
/**
 * 今回は、input-area、incompleted-area、completed-areaをコンポーネント分割していく。
 */

import { useState } from "react";
import "./styles.css";
import sha256 from "crypto-js/sha256";
import { InputTodo } from "./components/InputTodo";
import { IncompletedTodoList } from "./components/IncompletdTodoList";

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
      {/* InputTodoにpropsで変数、関数を渡す */}
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAddBtn}
      />
      <IncompletedTodoList
        todoList={incompletedTodoList}
        generateHash={generateHash}
        onClickCompleteBtn={onClickCompleteBtn}
        onClickDeleteBtn={onClickDeleteBtn}
      />
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
 * JSで開発したときと比べて、Reactで開発すると非常にシンプルになった。
 * 今回のTODOリストみたいに、画面の要素をガンガン書き換えていくことを考えてみると、
 * Reactみたいに、データに基づいて画面の要素をレンダリングしていく方がかなりシンプルに
 * 書けるし、実装者はラク。
 *
 * JSみたいにDOMを操作していくのは、しんどい。
 * 向いてるアプリと不向きなアプリがある。
 */
