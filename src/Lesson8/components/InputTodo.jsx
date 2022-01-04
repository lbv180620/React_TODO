/**
 * TODOを入力するためのコンポーネント
 *
 * ここにinput-areaを移行する。
 *
 * todoText、onChangeTodoText、onClickAddBtnが今はこちらのファイル上には無いので、
 * エラーが出ている。これらをInputTodoに渡す必要があるので、Propsを使う。
 *
 */

import React from "react";

// コンポーネント名はファイル名と合わせる
export const InputTodo = (props) => {
  // Props
  const { todoText, onChange, onClick } = props;
  return (
    <div className="input-area">
      <input placeholder="TODOを入力" value={todoText} onChange={onChange} />
      <button onClick={onClick}>追加</button>
    </div>
  );
};

/**
 * 1. componentsフォルダを用意してその下にコンポーネントファイルを作成
 * 2. 親コンポーネントのAppコンポーネントから、必要な変数・関数をPropsで渡す。
 * 3. 親と子のコンポーネント間でグルグル回るやり取りをする
 */
