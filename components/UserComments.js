
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link';

import UserCard from '../components/UserCard';
import ErrorMessage from "../components/ErrorMessage";

export const COMMENTS_QUERY = gql`
  query UserComments($id: ID!, $afterCommentCursor: String) {
    user(id: $id) {
      id,
      comments(first: 2, after: $afterCommentCursor) {
        edges {
          node {
            id
            body
            author {
              id
              fullName
            }
            createdAt
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const COMMENT_MUTATION = gql`
  mutation Comment($userId: ID!, $body: String!) {
   comment(userId: $userId, body: $body) {
    id
    body
    author {
      id
      fullName
    }
    createdAt
   }
  }
`

class UserComments extends React.Component {

  state = { comment: '' }

  updateComment = (e) => {
    this.setState({comment: e.target.value})
  }


  render() {
    const { user } = this.props;
    return (
      <div>
        <Query query={COMMENTS_QUERY} variables={{id: user.id}} errorPolicy="all">
          {({ loading, error, data, fetchMore }) => {
          if (error) {
            console.log(error)
            return <ErrorMessage message='Error loading comments' />
          }
          if (loading) return <div>Loading</div>

          if(!data.user){
            return null;
          }
          if(!data.user.comments){
            return 'No Comments'
          }
          const comments = data.user.comments;

          return (
            <div>
              <div>
                {comments.edges.map(({node: comment}) => {
                  return (
                    <div key={comment.id} style={{border: '1px solid black'}} >
                      <blockquote>{comment.body}</blockquote>
                      <cite>{comment.author ? comment.author.fullName : 'anonymous'}</cite>
                    </div>
                  )
                })}
              </div>
              <button type="button" onClick={() => {
                fetchMore({
                  variables: {
                    afterCommentCursor: comments.pageInfo.endCursor,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    console.log('prevres', previousResult)
                    console.log('newres', fetchMoreResult)

                    const newEdges = fetchMoreResult.user.comments.edges;
                    const newPageInfo = fetchMoreResult.user.comments.pageInfo;

                    if(newEdges.length < 1) {
                      return previousResult;
                    }

                    return {
                      user: {
                        ...previousResult.user,
                        comments: {
                          ...previousResult.user.comments,
                          edges: [...previousResult.user.comments.edges, ...newEdges],
                          pageInfo: newPageInfo
                        }
                      }
                    }
                  }
                })
              }}>Load More</button>
              <Mutation mutation={COMMENT_MUTATION} onCompleted={() => {
                this.setState({comment: ''})
              }} update={(proxy, mutationResponse) => {
                const data = proxy.readQuery({ query: COMMENTS_QUERY, variables: {
                  id: user.id,
                  // afterCommentCursor: xxx
                } });
                console.log('d', data)
                console.log('r', mutationResponse)
                data.user.comments.edges.unshift({
                  __typename: "CommentsEdge",
                  cursor: 'i dont have a cursor',
                  node: mutationResponse.data.comment
                })
                // data.todos.push(createTodo);
                // proxy.writeQuery({ query, data });
              }}>
                {(addComment, {loading, error}) => (

                  <form onSubmit={e => {
                    e.preventDefault();
                    addComment({ variables: { userId: user.id, body: this.state.comment }})
                  }}>
                    {error && <ErrorMessage message="Error saving comment"></ErrorMessage>}
                    <label htmlFor="new-comment">Add a comment</label>
                    <textarea name="new-comment" id="new-comment" onChange={this.updateComment} value={this.state.comment}></textarea>
                    <button type="submit" disabled={!!loading}>{loading ? 'Submitting...' : 'Submit' }</button>
                  </form>

                )}
              </Mutation>
            </div>
          )
          }}
        </Query>
      </div>
    )
  }
}

export default UserComments