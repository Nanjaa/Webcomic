/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Follow from './Follow';

export const path = '/follow';
export const action = async (state) => {
  const title = 'Follow Me';
  state.context.onSetTitle(title);
  return <Follow title={title} />;
};
