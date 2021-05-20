import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Day.module.css';
function Account({ word: w }) {
  const [account, setAccount] = useState(w);
  // const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(account.isDone);
  // function toggleShow() {
  //   setIsShow(!isShow);
  // }

  function toggleDone() {
    // setIsDone(!isDone);
    fetch(`http://localhost:3001/account/${account.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...account,
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsDone(!isDone);
      }
    });
  }

  function del() {
    if (window.confirm('삭제 하시겠습니까?')) {
      fetch(`http://localhost:3001/account/${account.id}`, {
        method: 'DELETE',
      }).then((res) => {
        if (res.ok) {
          setAccount({
            ...account,
            id: 0,
          });
        }
      });
    }
  }
  if (account.id === 0) {
    return null;
  }

  return (
    // <tr className={isDone ? styles.off : ''}>
    //   <td>
    //     <input type="checkbox" checked={isDone} onChange={toggleDone} />
    //   </td>
    //   <td>{account.price}</td>
    //   <td>{account.text}</td>
    //   <td>
    //     <Link className={styles.link} to={`/account/${account.id}`}>
    //       수정
    //     </Link>
    //     <button className={styles.btn_del} onClick={del}>
    //       삭제
    //     </button>
    //   </td>
    // </tr>
    <section className={styles.account_section}>
      <div className={styles.account_container}>
        <div className={isDone ? styles.off : ''}>
          <div className={styles.checkbox}>
            <input type="checkbox" checked={isDone} onChange={toggleDone} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.ac_price}>
              {parseInt(account.price).toLocaleString('ko-KR')}
            </h3>
            <span className={styles.ac_text}>{account.text}</span>
          </div>
          <div className={styles.btn_btn}>
            <Link className={styles.link} to={`/edit/account/${account.id}`}>
              수정
            </Link>
            <button className={styles.btn_del} onClick={del}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;
