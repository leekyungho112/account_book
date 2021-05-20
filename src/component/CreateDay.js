import React from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import styles from './CreateDay.module.css';
function CreateDay() {
  const days = useFetch('http://localhost:3001/days');
  const history = useHistory();

  function addDay() {
    fetch(`http://localhost:3001/days/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        day: days.length + 1,
      }),
    }).then((res) => {
      if (res.ok) {
        alert('생성이 완료 되었습니다.');
        history.push(`/`);
      }
    });
  }

  return (
    <div className={styles.date_container}>
      <div className={styles.wrap}>
        <h4 className={styles.count}>현재일수 : {days.length}일</h4>
        <button className={styles.btn_add} onClick={addDay}>
          Day 추가
        </button>
      </div>
    </div>
  );
}

export default CreateDay;
