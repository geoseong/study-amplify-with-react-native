import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

const SubmitBtn = ({ submitEvt }) => {
  return (
    <>
      <TouchableOpacity onPress={submitEvt}>
        <Text>ADD!</Text>
      </TouchableOpacity>
    </>
  );
};

export { SubmitBtn };
