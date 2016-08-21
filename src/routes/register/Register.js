/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.scss';

function Register({ title }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>This is the same idea as the login. It has an index.js file that shows what's in src > routes > register > Register.js</p>
      </div>
    </div>
  );
}

Register.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Register, s);
