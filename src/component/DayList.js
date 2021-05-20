import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import styles from './DayList.module.css';
function DayList() {
  const days = useFetch('http://localhost:3001/days');

  if (days.length === 0) {
    return <div className={styles.loading}>Loading....</div>;
  }

  // const [days, setDays] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:3001/days')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setDays(data);
  //     });
  // }, []);

  return (
    <div className={styles.day_container}>
      <ul className={styles.list_day}>
        {days.map((day) => (
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day {day.day}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DayList;
