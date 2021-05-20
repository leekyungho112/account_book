import styles from './Day.module.css';
import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { Link, useHistory, useParams } from 'react-router-dom';
import Account from './Account';
import useFetch from '../hooks/useFetch';
//dummy.account
function Day() {
  const { day } = useParams();
  const account = useFetch(`http://localhost:3001/account?day=${day}`);
  const days = useFetch('http://localhost:3001/days');
  const history = useHistory();
  //   const accountList = dummy.account.filter(
  //     (item) => item.day === parseInt(day)
  //   );
  //   const [account, setAccount] = useState([]);
  //   useEffect(() => {
  //     fetch(`http://localhost:3001/account?day=${day}`)
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setAccount(data);
  //       });
  //   }, [day]);

  const result = account.reduce((prev, cur) => {
    return parseInt(prev) + parseInt(cur.price);
  }, 0);

  function del() {
    if (window.confirm('삭제하시겠습니까?')) {
      fetch(`http://localhost:3001/days/${day}`, {
        method: 'DELETE',
      }).then((res) => {
        if (res.ok) {
          if (account) {
            account.forEach(async (ac) => {
              if (parseInt(ac.day) === parseInt(day)) {
                await fetch(`http://localhost:3001/account/${ac.id}`, {
                  method: 'DELETE',
                }).then((res) => {
                  if (res.ok) {
                    history.push('/');
                  }
                });
              }
            });
          }
          history.push('/');
        }
      });
    }
  }

  return (
    <>
      <div className={styles.day_title}>
        <Link
          className={styles.arrow_left}
          to={
            Number(day) >= 2
              ? `/day/${parseInt(day) - 1}`
              : `/day/${days.length}`
          }
        >
          <IoArrowBackOutline />
        </Link>
        <span>Day{day}</span>
        <span>총 지출내역:{result.toLocaleString('ko-KR')}원</span>

        <Link
          className={styles.arrow_right}
          to={
            Number(day) < days.length
              ? `/day/${parseInt(day) + 1}`
              : `/day/${1}`
          }
        >
          <IoArrowForwardOutline />
        </Link>
      </div>
      <button onClick={del}>날짜삭제</button>
      <div className={styles.table}>
        {account.length === 0 && (
          <div className={styles.loading}>Loading...</div>
        )}
        <div className={styles.color}></div>
        <div className={styles.color}></div>
        <div className={styles.color}></div>
        <div className={styles.day_contaniner}>
          {account.map((word) => (
            <Account word={word} key={word.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Day;
