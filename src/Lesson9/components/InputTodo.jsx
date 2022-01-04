/**
 * inpu-areaのスタイルをInputTodoに書いていく。
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
  const { todoText, onChange, onClick } = props;
  return (
    <div style={style}>
      <input placeholder="TODOを入力" value={todoText} onChange={onChange} />
      <button onClick={onClick}>追加</button>
    </div>
  );
};

/**
 * コンポーネント化するともうひとつ見ていきたいところがある。
 * CSSであてているクラス名。これはstyles.
 *
 * input-areaという名称で以って、スタイルを管理しているという状態。
 * ただコンポーネント分割していてinput-areaというスタイルに関心を持つのはInputTodoコンポーネント
 * だけでいいのではないかという問題が出て来たり、議論になったりする。
 *
 * なので、このCSSで書いている部分もstyles.cssから関心を持つコンポーネントに直接書いて管理してあげればいいのではないか？
 * これを CSS-in-JS という。
 *
 * それを実装するために便利なライブラリがある。
 * このCSSの書き方がそのままJSの中に書けたりする。
 *
 * まずはインラインスタイルでやろう。
 * タグにstyle属性を書いて、オブジェクトを当てていく。
 * この書き方でスタイルをあてて、CSSファイルにあるスタイルの情報をコンポーネントの方に閉じていく。
 *
 * このようにコンポーネント内にスタイルの情報を移してあげることで、
 * このCSSファイルからinput-areaに対する関心を取り除くことができた。
 *
 * ただCSS-in-JSに関しては必ずしもこれが正解という訳ではなくてそれぞれのチームの状況による。
 * デザイナーさんがいてCSSを書いたりする場合はCSSファイルに書いていった方がよかったりする。
 */
