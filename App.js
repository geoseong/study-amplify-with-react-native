import Amplify from 'aws-amplify';
import React from 'react';
import SwitchNav from './src/navigator/switch';
import config from './src/aws-exports';
import { createAppContainer } from 'react-navigation';

Amplify.configure(config);

const AppContainer = createAppContainer(SwitchNav);

global.Buffer = global.Buffer || require('buffer').Buffer
window.LOG_LEVEL = 'DEBUG';

export default AppContainer;
