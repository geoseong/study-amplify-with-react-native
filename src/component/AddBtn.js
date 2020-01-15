import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import styles from '../style';

const AddBtn = ({ navigation }) => {
  const gotoAddPost = () => {
    navigation.navigate('CreatePost')
  }
  return (
    <>
      <View style={[styles.flexRow, styles.contentCenter, styles.bottomFix]}>
        <TouchableOpacity style={{}} onPress={gotoAddPost}>
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export { AddBtn };
