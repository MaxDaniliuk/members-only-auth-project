import { format, parseISO } from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostsContext } from '../hooks/usePostsContext';
import noImage from '../assets/images/noImage.jpg';
import Trashcan from '../assets/images/trashcan.svg?react';

export default function Post({ post, authorized }) {
  const { user } = useAuthContext();
  const { postsState, dispatch: postsDispatch } = usePostsContext();

  async function deletePost() {
    const post_id = post.post_id;
    try {
      const res = await fetch(`/api/delete/posts/${post_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        console.error(
          'Unexpected response from server. Please try again later.',
        );
        return;
      }
      if (!res.ok) {
        if (data?.message) {
          console.error(data.message);
        } else {
          console.error(
            'Unexpected response from server. Please try again later.',
          );
        }
        return;
      }

      console.log(data.message);
      postsDispatch({
        type: 'SUCCESS',
        payload: {
          authorized,
          posts: postsState.postsResponse.posts.filter(
            post => post.post_id !== post_id,
          ),
        },
      });
    } catch (error) {
      console.error('Unexpected server response. Please try again later.');
      return;
    }
  }

  return (
    <li className="post-wrapper" data-post-id={post.post_id}>
      <div>
        <p className="name">{authorized ? `By ${post.username}` : null}</p>
        <p className="date">
          {authorized
            ? `Posted: ${format(parseISO(post.created_at), 'yyyy-MM-dd, HH:mm')}`
            : null}
        </p>
        <div className="post">
          <div className="container-one">
            <div className="logo-container">
              <img src={noImage} className="logo" alt="No image" />
            </div>
            <h3 className="topic">{post.title}</h3>
          </div>
          <p className="post-text">{post.post}</p>
        </div>
      </div>
      {user && user?.isadmin && (
        <button type="button" className="delete-button">
          <Trashcan className="trashcan" onClick={deletePost} />
        </button>
      )}
    </li>
  );
}
