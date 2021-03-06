import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import SwitchNav from './src/navigator/switch';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(SwitchNav);

global.Buffer = global.Buffer || require('buffer').Buffer;

// uncomment if you want to check all DEBUG log.
// window.LOG_LEVEL = 'DEBUG';

/**
 * @name error_process_subscription_long_period_time
 * @description
 * error happens: Setting a timer for a long period of time, i.e. multiple minutes,
 * @refernce https://github.com/firebase/firebase-js-sdk/issues/97#issuecomment-427512040
 */
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

export default AppContainer;
