import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import styles from './CreateAccount.module.css';
function CreateAccount() {
  const days = useFetch('http://localhost:3001/days');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log(!isLoading);
    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:3001/account/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: dayRef.current.value,
          text: productRef.current.value,
          price: priceRef.current.value,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert('생성이 완료 되었습니다.');
          history.push(`/day/${dayRef.current.value}`);
          setIsLoading(false);
        }
      });
    }
  }
  const priceRef = useRef(null);
  const productRef = useRef(null);
  const dayRef = useRef(null);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.title}>가계부 구매 작성 폼</span>

        <form onSubmit={onSubmit}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.input_area}>
                <input type="text" ref={productRef} />
                <label className={styles.text}>구매물품</label>
                <span className={styles.line}></span>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.input_area}>
                <input type="number" min="0" ref={priceRef} />
                <label className={styles.text}>가격</label>
                <span className={styles.line}></span>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.input_area}>
                <select className={styles.select} ref={dayRef}>
                  {days.map((day) => (
                    <option key={day.id} value={day.day}>
                      {day.day}
                    </option>
                  ))}
                </select>
                <label className={styles.text}>Day</label>
                <span className={styles.line}></span>
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <button className={styles.btn_save}>
              {isLoading ? '저장중...' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateAccount;
