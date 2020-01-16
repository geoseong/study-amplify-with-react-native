import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import styles from '../style';

const AddBtn = ({ navigation }) => {
  const gotoAddPost = () => {
    navigation.navigate('CreatePost')
  }
  return (
    <>
      <TouchableOpacity style={[styles.pb1, styles.pt1, styles.pl1, styles.pr1]} onPress={gotoAddPost}>
        <Text>ADD POST</Text>
      </TouchableOpacity>
    </>
  );
};

export { AddBtn };
