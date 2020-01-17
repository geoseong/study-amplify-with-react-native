import { API, Storage, graphqlOperation } from 'aws-amplify';
import { Image, Text, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import { FormattedDate } from './FormattedDate';
import { Like } from './Like';
import styles from '../style';
import { updatePost } from '../graphql/mutations';

const MemoizedImage = memo(({ imageUrl }) => (
  <Image
    style={{ width: '100%', height: 300 }}
    source={{
      uri: imageUrl,
    }}
    resizeMode={'cover'}
  />
));
const Post = ({
  id,
  bucket,
  region,
  path,
  content,
  likes,
  author,
  setPosts,
  updatedAt,
}) => {
  // TODO: createdAt, updatedAt date format coding
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
  const [_likes, setLikes] = useState(likes);
  const [imageUrl, setImageUrl] = useState(imageUrl);
  useEffect(() => {
    setLikes(likes);
    Storage.get(path)
      .then(file => {
        setImageUrl(file);
      })
      .catch(err => console.warn('---- post error', err));
  }, []);
  const setLike = async () => {
    const incrementedLike = {
      id,
      likes: _likes + 1,
    };
    const likeRes = await API.graphql(
      graphqlOperation(updatePost, {
        input: incrementedLike,
      }),
    );
    console.log('setLike likeRes', likeRes);
    setLikes(likeRes.data.updatePost.likes);
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
        {imageUrl && <MemoizedImage imageUrl={imageUrl} />}
        {/* {imageUrl && (
          <Image
            style={{ width: '100%', height: 300 }}
            source={{
              uri: imageUrl,
            }}
            resizeMode={'cover'}
          />
        )} */}
        <View style={{ marginVertical: 15 }}>
          <Text>{content}</Text>
          <View style={{ textAlign: 'right' }}>
            <FormattedDate date={updatedAt} />
          </View>
        </View>
        <View style={[styles.flexRow, styles.contentBetweenAlignCenter]}>
          <View style={[styles.flexRow]}>
            <Text>{_likes} Likes</Text>
            <Like id={id} likes={_likes} setLike={setLike} />
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
