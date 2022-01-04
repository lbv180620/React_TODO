// 57. カイゼン(コンポーネント化)
/**
 * 今回は、input-area、incompleted-area、completed-areaをコンポーネント分割していく。
 */

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
      <CompletedTodoList
        todoList={completedTodoList}
        generateHash={generateHash}
        onClickBackBtn={onClickBackBtn}
      />
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

/**
 * 先ほどはコンポーネント分割していなかったので長かったが、スッキリした。
 *
 * このようにコンポーネント化することのメリットのひとつが、コードの見通しがよくなる。
 * この画面がどういう要素で成り立っているのかの見通しがよくなった。
 *
 * もうひとつのメリットは、CompletedTodoListコンポーネントを他のエリアにも使いたいとなった時に、
 * もしベタ書きしたときは、JSXをもう一度書かなくてはならない。
 * コンポーネントかしていれば、もし他の画面で使いたくなってもシンプルに書ける。
 * 今は作成したコンポーネントの抽象度が低いので使い回すことができないが、
 * 例えば、InputTodoコンポーネントの抽象度を上げて他の画面でも使い回せるようになるには、
 * 例えばInputWithBtnというコンポーネント名にして、todoTextもTextといった風に名前の抽象度を上げて、
 * Propsに渡して、placeholder属性をpropsとして定義できるようにしてあげれば、
 * Todo以外にも、inputとボタン、何か入力してそれに応じてボタンを押して何かするようなエリアはサービスによくあると思うが、
 * 一度InputWithBtnを作成しておけば、他の場所でもそのコンポーネントが使い回すことができる。
 *
 * コンポーネント分割は結構自由度が高く、いろんなプロジェクトで設けていたりする。
 * componentsフォルダの下、どういうフォルダ分割にしていくのかによって保守性が変わる。
 * 有名なところで、Atomic Designというコンポーネント分割の手法がある。
 *
 * 抽象度どの程度にするか考えてコンポーネントを作成
 */
