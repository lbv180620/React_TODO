// 53. タスクの追加機能
/**
 * 追加機能は、追加ボタンを押したときに、
 * テキストボックスの値がincompletedTodoListに追加される処理
 *
 * テキストボックスの値も動的に状態が変化するので、State化する。
 */

import { useState } from "react";
import "./styles.css";

export const App = () => {
  //State
  /**
   * テキストボックスの値のState化
   */
  const [todoText, setTodoText] = useState("");

  const [incompletedTodoList, setIncompletedTodoList] = useState([
    { id: "1", name: "ああああ" },
    { id: "2", name: "いいいい" }
  ]);

  const [completedList, setCompletedList] = useState([
    { id: "3", name: "うううう" }
  ]);

  // 関数
  /**
   * このinputのonChange関数は引数(event)を取る。
   * これはinputの要素がonChangeで変更があった時に入ってくるイベントで、
   * event.target.valueに実際の入力した値が入ってくる。
   * この実際に入力されて来た値で初期値からtodoTextの値を更新したいので、更新関数の引数に入れる。
   */
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  /**
   * 追加ボタンを押したら、todoTextの値をincompletedTodoListに格納する。
   */
  const onClickAddBtn = () => {
    /**
     * 格納するための新しい配列を用意
     * スプレッド構文で配列の結合
     *
     * これで今のincompletedTodoListの要素をnewTodoListにディープコピーした。
     * そして、一番後ろに今のtodoTextの値を追加する。
     * これで、既存のincompletedTodoListに新しいTodoが追加された配列ができた。
     *
     * で、incompletedTodoListの更新関数の引数に新しく作ったこの配列を入れて、incompletedTodoListを更新。
     */
    // 未入力で空文字のままでは追加できないようにする。
    if (todoText === "") return;
    const newTodo = { id: generateRandomString(), name: todoText };
    const newTodoList = [...incompletedTodoList, newTodo];
    setIncompletedTodoList(newTodoList);
    // 処理が終わったらテキストボックスの値を初期化する
    setTodoText("");
  };

  /**
   * ランダムな文字列を生成する
   * 大文字小文字の英字と0~9の数字で構成
   */
  const generateRandomString = (
    num = 8,
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ) => {
    let result = "";
    const charsLength = chars.length;

    for (let i = 0; i < num; i++) {
      // 0~32のランダムな数値からcharsの文字から1文字拾ってresultに格納する
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return result;
  };

  return (
    <>
      <div className="input-area">
        {/* 
        テキストボックスに入力された値をtodoTextで受け取る。

        このままだと、初期値が常に空文字なので、入力しても変化なし。
        このinputで何か変更があったら、このState(todoText)も変更するという処理を書く。
        inputの変更の検知はonChange属性を使う。

        整理すると、inputの値を取り出したいので、実際に入力したvalueをstateとして定義。
        そしてvalue属性に設定していくが、onChangeで入力が変わる度に、そのStateの値も変わって欲しいので、
        onChange関数を用意して、その関数の中で、onChangeに設定している関数なので、eventの引数を受け取ることができる。
        event.target.valueの中に実際の値が入って来るので、その値を更新関数setTodoTextでStateのTodoTextに反映している。

        テキストボックスの入力値が変わる -> onChangeイベントが発生 
        -> onChange関数が呼び出さる -> 入力値が更新関数によりStateのtodoTextに代入される
        -> これによりvalue属性の値が動的に可変する

        このようにReactでinputの値をStateとして定義する場合、このような処理を書く必要がある。
         */}
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

/**
 * JSだけのときと比べて、DOM操作をしなくても、配列にテキストを設定して上げるだけで、
 * Stateが変更されて、再度変更に応じてレンダリングされるので、追加することができている。
 *
 * このようにボタンにイベントを割り当ててStateを変更させたりすることで、アプリケーションを開発していく。
 */
