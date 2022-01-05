/**
 * 5個アイテムが入力された状態でメッセージ出るようにする
 *
 * それ以上アイテムが追加できないようにするために、inputタグとbuttonタグをdisabledにする。
 */

import React from "react";

// CSS
const style = {
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "30px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const InputTodo = (props) => {
  // Props
  const { todoText, onChange, onClick, disabled } = props;
  return (
    <div style={style}>
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};

/**
 * 機能を実装するときもまず画面から作って、画面で確認する！！
 */

/**
 * InputTodoはdisabledにするかしないかに意識すればいいのでpropsとしてdisabledのフラグを用意する。
 * disabledがtrueのときはdisabledが付くし、falseのときはdisabledにしないというコンポーネントにする。
 */
