// 52. Reactでの実装を意識したモックに変更

import { useState } from "react";
import "./styles.css";

export const App = () => {
  //State
  /**
   * ①未完了のTODOを格納する配列の状態変数と更新関数と初期値を定義
   */
  const [incompletedTodoList, setIncompletedTodoList] = useState([
    { id: 1, name: "ああああ" },
    { id: 2, name: "いいいい" }
  ]);

  /**
   * ③完了のTODOを格納する配列の状態変数と更新関数と初期値を定義
   */
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
          {/* 
          ②incompletedTodoListとmap関数を使って書き換え
          */}
          {incompletedTodoList.map((todo) => {
            const { id, name } = todo;
            return (
              /**
               * ※注意点：Reactでループして処理する場合、
               * ループ内で返却している一番親の要素のタグにkeyを設定する必要がある。
               *
               * これは何かと言うと、Reactの裏側で動いている仮想DOMという技術は変更前と変更後で差分だけを抽出して
               * 実際にその差分のみ実際のDOMに反映させていくので、このようにループでレンダリングされた場合(Stateが更新されるとレンダリングされる)
               * 何個目の要素なのか正確に比較するために、目印を付けてやる必要がある。
               *
               * なのでmapなど使用してレンダリングさせていく時は、keyの設定を忘れないようにしておく。
               * keyを設定していないと、
               * Warning: Each child in a list should have a unique "key" prop.
               * ということで、keyを設定してくれと怒られる。
               */
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
          {/* 
          ④completedTodoListとmap関数を使って書き換え
          */}
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

/**
 * li部分のTODO名は状態が変化するので、Stateとして定義する。
 * (同じ構造の要素を比較して相違な部分がStateにすべき箇所)
 *
 * おいおいStateで定義することになるので、一旦Stateで定義して、初期値を渡しておく。
 * li部分は複数あって個数も変わるので、配列で定義する。
 */
