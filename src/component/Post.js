import { API, graphqlOperation } from 'aws-amplify';
import { FormattedDate, Like } from './';
import { Image, Text, View } from 'react-native';
import React, { useState } from 'react';

import styles from '../style';
import { updatePost } from '../graphql/mutations';

const updateSpecificPost = post => {
  // setPosts
}
const Post = ({
  id,
  bucket,
  region,
  path,
  content,
  likes,
  setPosts,
  updatedAt,
}) => {
  const [_likes, setLikes] = useState(likes)
  console.log('Post props', {
    id,
    bucket,
    region,
    path,
    content,
    likes,
    updatedAt,
  });
  // const { bucket, region, path, content, likes, updatedAt } = props;

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
    setLikes(likeRes.data.updatePost.likes)
  };

  return (
    <>
      <View style={styles.sectionContainer}>
        <Image
          style={{ width: '100%', height: 100, resizeMode: 'contain' }}
          source={{
            uri: `https://${bucket}.s3.${region}.amazonaws.com/${path}`,
          }}
        />
        <View>
          <Text>{content}</Text>
        </View>
        <View style={[styles.flexRow, styles.contentBetweenAlignCenter]}>
          <View style={[styles.flexRow]}>
            <Text>{_likes} Likes</Text>
            <Like id={id} likes={_likes} setLike={setLike} />
          </View>
          <View style={{}}>
            <FormattedDate date={updatedAt} />
          </View>
        </View>
      </View>
    </>
  );
};

export { Post };
