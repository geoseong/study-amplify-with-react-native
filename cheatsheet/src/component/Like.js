import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import styles from '../style';

const Like = ({ id, likes, setLike }) => {
  return (
    <>
      <View style={[styles.pl1, styles.pr1]}>
        <TouchableOpacity style={{}} onPress={setLike}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Like</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export { Like };
