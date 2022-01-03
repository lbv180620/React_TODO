// 54. タスクの削除機能
/**
 * 対象の行の削除ボタンを押したときに、未完了のTODOから削除していく。
 *
 * プレーンなJSのときは、対象の行のidで指定して、それをDOMから削除するという風に実装した。
 * Reactの場合は、incompletedTodoListの配列から対象のテキストを削除するようにする。
 */

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

  const onClickDeleteBtn = (index) => {
    // alert(index);
    /**
     * 今どの削除ボタンを押しても何行目の削除ボタンかわからないので、
     * 何行目が押されたか意識する必要がある。
     *
     * あとはこのindexに基づいてincompletedListから値を消してあげればいい。
     *
     * 新しい配列を定義し、今のincompletedListをディープコピーする。
     * この配列から指定のindexの値を削除する。
     *
     * 方法はいくつかあるが、今回はspliceを使う。
     * spliceは第1引数に何番目の要素かを受け取って、第2引数にいくつ削除するか指定する。
     *
     * あとは、削除済みのnewTodoListでincompletedTodoListを更新する。
     *
     * このようにループしてレンダリングしている中で何番目の行が押されたか判定したい場合は、
     * mapのindexを関数に渡して、イベント関数の中で何番目か判定して、いろんな処理をしていく。
     */
    const newTodoList = [...incompletedTodoList];
    newTodoList.splice(index, 1);
    setIncompletedTodoList(newTodoList);
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
                  <button>完了</button>
                  {/* 
                  <button onClick={onClickDeleteBtn(index)}>削除</button>
                  関数名から関数に変えるだけだと、この時点で関数が実行されてしまう。
                  実際には削除ボタンが押された時に動いて欲しいので、その場合は、関数はアロー関数の中に
                  書く。新しく関数を生成するイメージなる。

                  このように関数に引数を渡したいときはそのまま書くのではなく、アロー関数で新しく関数を生成してあげる必要がある。
                */}
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
