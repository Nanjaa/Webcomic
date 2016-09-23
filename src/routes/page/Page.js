import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Page.scss';
import ComicNavigation from '../../components/comicnavigation';
import ComicDisplay from '../../components/comicdisplay';

function Page({ news }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <ComicDisplay/>
      </div>
    </div>
  );
}

export default withStyles(Page, s);
