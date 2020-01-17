import { API, Storage, graphqlOperation } from 'aws-amplify';
import { Image, Text, View } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';

import { FormattedDate } from './FormattedDate';
import { Like } from './Like';
import styles from '../style';
import { updatePost } from '../graphql/mutations';

const Post = ({
  id,
  bucket,
  region,
  path,
  content,
  likes,
  author,
  setPosts,
  createdAt,
  updatedAt,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  console.log('Post props', {
    id,
    bucket,
    region,
    path,
    content,
    likes,
    author,
    updatedAt,
  });
  useEffect(() => {
    // setLikes(likes);
    Storage.get(path)
      .then(file => {
        setImageUrl(file);
      })
      .catch(err => console.warn('---- post error', err));
  }, []);
  const setLike = async () => {
    const incrementedLike = {
      id,
      likes: likes + 1,
    };
    const likeRes = await API.graphql(
      graphqlOperation(updatePost, {
        input: incrementedLike,
      }),
    );
    console.log('setLike likeRes', likeRes);
    // setLikes(likeRes.data.updatePost.likes);
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
