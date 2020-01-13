// import { Text, View } from 'react-native';

import React from 'react';
import SwitchNav from './src/navigator/switch';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(SwitchNav);

export default AppContainer;
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }
window.LOG_LEVEL = 'DEBUG';
