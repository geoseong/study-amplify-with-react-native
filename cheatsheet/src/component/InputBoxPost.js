import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const InputBoxPost = ({ content = '', setContent }) => {
  const [onLoad, setOnLoad] = useState(false);
  const [isError, setError] = useState(null);
  useEffect(() => {
    if (onLoad && content.length === 0) {
      setError(true);
    } else if (onLoad && content.length > 0) {
      setError(false)
    }
    if (!onLoad) {
      setOnLoad(true);
    }
  }, [content]);
  const onChangeText = e => {
    setContent(e);
  };
  return (
    <>
      <View style={{ padding: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
        <TextInput
          multiline
          style={{ width: '100%', minHeight: 100 }}
          placeholder={`Please write your content!`}
          onChangeText={onChangeText}
          value={content}
        />
      </View>
      {isError && <Text style={{ color: 'red' }}>{'YOU CANNOT POST WITH EMPTY CONTENT!!'}</Text>}
    </>
  );
};

export { InputBoxPost };
