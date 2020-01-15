import { Text, TextInput, View } from 'react-native';

import React from 'react';
import { useInput } from '../hooks';

const InputBoxPost = props => {
  return (
    <>
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ width: '100%', minHeight: 100 }}
          placeholder='내용을 입력해 주세요!'
          onChangeText={useInput.onChangeText}
          value={useInput.value}
        />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text
            .split(' ')
            .map(word => word && '🍕')
            .join(' ')}
        </Text>
      </View>
    </>
  );
};

export { InputBoxPost };
