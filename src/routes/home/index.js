/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';

export const path = '/';
export const action = async (state) => {
  const title = 'Comic Title Page ...';
  state.context.onSetTitle(title);
  return <Home title={title} />;
};