import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import styles from '../style';

const AddBtn = ({ id, likes, setLike }) => {
  return (
    <>
      <View style={[styles.pl1, styles.pr1]}>
        <TouchableOpacity style={{}} onPress={setLike}>
          <Text>Like</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export { AddBtn };
