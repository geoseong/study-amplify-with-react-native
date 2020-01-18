import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import styles from '../style';

const AddBtn = ({ navigation }) => {
  const gotoAddPost = () => {
    navigation.navigate('CreatePost')
  }
  return (
    <>
      <TouchableOpacity style={[styles.p1]} onPress={gotoAddPost}>
        <Text style={[styles.fontBold]}>ADD POST</Text>
      </TouchableOpacity>
    </>
  );
};

export { AddBtn };
