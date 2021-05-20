import React from 'react';
import { Link } from 'react-router-dom';

function EmptyPage() {
  return (
    <div>
      <h2> 잘못된 접근입니다.</h2>
      <Link to="/">go home⏪</Link>
    </div>
  );
}

export default EmptyPage;
