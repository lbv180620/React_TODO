// 50. JSXで構造を作成(モック作成)

import "./styles.css";

export const App = () => {
  return (
    <>
      <div className="input-area">
        <input placeholder="TODOを入力" />
        <button>追加</button>
      </div>
      <div className="incompleted-area">
        <p className="title">未完了のTODO</p>
        <ul>
          <li>
            <div className="list-row">
              <p>TODOです。</p>
              <button>完了</button>
              <button>削除</button>
            </div>
          </li>
        </ul>
      </div>
      <div className="completed-area">
        <p className="title">完了したTODO</p>
        <ul>
          <li>
            <div className="list-row">
              <p>完了しました。</p>
              <button>戻す</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

/**
 * JSXでは、classではなくclassName
 */
