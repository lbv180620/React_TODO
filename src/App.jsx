import { useState } from "react";
import "./styles.css";
import sha256 from "crypto-js/sha256";
import { InputTodo } from "./components/InputTodo";
import { IncompletedTodoList } from "./components/IncompletdTodoList";
import { CompletedTodoList } from "./components/CompletedTodoList";

export const App = () => {
  //State
  const [todoText, setTodoText] = useState("");

  const [incompletedTodoList, setIncompletedTodoList] = useState([]);

  const [completedTodoList, setCompletedList] = useState([]);

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
      ...addToTodoList(incompletedTodoList[index], completedTodoList)
    ];

    setIncompletedTodoList(newIncompletedTodoList);
    setCompletedList(newCompletedTodoList);
  };

  const onClickBackBtn = (index) => {
    const newCompletedList = [...deleteFromTodoList(index, completedTodoList)];
    const newIncompletedTodoList = [
      ...addToTodoList(completedTodoList[index], incompletedTodoList)
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
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAddBtn}
        // JSXではdisabledやrequiredなのでdisabled=trueで表す
        disabled={incompletedTodoList.length >= 5}
      />
      {/* ①メッセージ */}
      {incompletedTodoList.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるTODOは5個までだよ！消化しろ〜！
        </p>
      )}
      <IncompletedTodoList
        todoList={incompletedTodoList}
        generateHash={generateHash}
        onClickCompleteBtn={onClickCompleteBtn}
        onClickDeleteBtn={onClickDeleteBtn}
      />
      <CompletedTodoList
        todoList={completedTodoList}
        generateHash={generateHash}
        onClickBackBtn={onClickBackBtn}
      />
    </>
  );
};
