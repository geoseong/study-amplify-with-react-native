import { Image, Text, View } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';

import { FormattedDate } from './FormattedDate';
import { Like } from './Like';
import styles from '../style';

const Post = ({
  id,
  bucket,
  region,
  path,
  content,
  likes,
  author,
  username,
  createdAt,
  updatedAt,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const setLike = async () => {
  };

  return (
    <>
      <View
        style={[
          styles.sectionContainer,
          {
            borderBottomColor: 'gray',
            borderStyle: 'solid',
            borderBottomWidth: 1,
          },
        ]}
      >
        {imageUrl && (
          <Image
            style={{ width: '100%', height: 300 }}
            source={{
              uri: imageUrl,
            }}
            resizeMode={'cover'}
          />
        )}
        <View style={{ marginVertical: 15 }}>
          <Text>{content}</Text>
          <View style={{ textAlign: 'right' }}>
            <FormattedDate date={createdAt} />
          </View>
        </View>
        <View style={[styles.flexRow, styles.contentBetweenAlignCenter]}>
          <View style={[styles.flexRow]}>
            <Text>{likes} Likes</Text>
            <Like id={id} likes={likes} setLike={setLike} />
          </View>
          <View style={{}}>
            <Text>
              Posted by
              <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                {' '}
                {author}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export { Post };
