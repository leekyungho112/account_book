import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import styles from './CreateAccount.module.css';
function EditAccount() {
  const days = useFetch('http://localhost:3001/days');
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [account, setAccount] = useState({});
  const { text, price } = account;

  useEffect(() => {
    fetch(`http://localhost:3001/account/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAccount(data);
      });
    return () => setIsLoading(false);
  }, [id]);

  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:3001/account/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: parseInt(dayRef.current.value),
          text: productRef.current.value,
          price: parseInt(priceRef.current.value),
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert('수정이 완료 되었습니다.');
          history.push(`/day/${dayRef.current.value}`);
          setIsLoading(false);
        }
      });
    }
  }
  function handleChange(e) {
    setAccount({ [e.target.name]: e.target.value });
  }

  const priceRef = useRef(null);
  const productRef = useRef(null);
  const dayRef = useRef(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.title}>가계부 수정 폼</span>
        <form onSubmit={onSubmit}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.input_area}>
                <input
                  type="text"
                  ref={productRef}
                  name="text"
                  defaultValue={text}
                  onChange={handleChange}
                />
                <label className={styles.text}>구매물품</label>
                <span className={styles.line}></span>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.input_area}>
                <input
                  type="number"
                  min="0"
                  name="price"
                  ref={priceRef}
                  defaultValue={price}
                  onChange={handleChange}
                />
                <label className={styles.text}>가격</label>
                <span className={styles.line}></span>
              </div>
            </div>

            <div className={styles.col}>
              <div className={styles.input_area}>
                <select
                  className={styles.select}
                  ref={dayRef}
                  onChange={handleChange}
                >
                  {days.map((date) => (
                    <option key={date.id} defaultValue={date.day}>
                      {date.day}
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
              {isLoading ? '수정중...' : '수정하기'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditAccount;
