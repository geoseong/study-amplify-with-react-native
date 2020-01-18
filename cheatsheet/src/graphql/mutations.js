/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
    id
    content
    image {
      bucket
      region
      key
    }
    likes
    author
    createdAt
    updatedAt
  }
}
`;
export const updatePost = `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
    id
    content
    image {
      bucket
      region
      key
    }
    likes
    author
    createdAt
    updatedAt
  }
}
`;
export const deletePost = `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
    id
    content
    image {
      bucket
      region
      key
    }
    likes
    author
    createdAt
    updatedAt
  }
}
`;
