import React, { useEffect, useState } from 'react';
import { getPagesArray } from '../../../utils/tasks';
import classes from './MyPagination.module.css';

const MyPagination = ({totalPages, page, changePage, pageLimit, pageMax, pageMin}) => {
  let pagesArray = getPagesArray(totalPages);

  const renderPages = pagesArray.map(p => {
    if (p <= pageMax && p >= pageMin) {
      return (
        <button
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? classes.page + ' ' + classes.pageCurrent : classes.page}>
          {p}
        </button>
      );
    } else {
      return null;
    }
  });

  return (
    <div className={classes.pageWrapper}>
      {renderPages}
    </div>
  );
};

export default MyPagination;
