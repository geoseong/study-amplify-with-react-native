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
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2684FF' }}>ADD!</Text>
      </TouchableOpacity>
    </>
  );
};

export { SubmitBtn };
