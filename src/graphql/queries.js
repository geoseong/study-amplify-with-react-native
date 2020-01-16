/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
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
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    }
    nextToken
  }
}
`;
