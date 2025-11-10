import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import noImage from '../assets/images/noimage.jpg';
import Trashcan from '../assets/images/trashcan.svg?react';
import DrowdownArrow from '../assets/images/dropdown_arrow.svg?react';
import getBaseURL from '../utils/getBaseURL';

const API_BASE_URL = getBaseURL();

export default function Post({ post, user }) {
  const [collapsed, setCollapsed] = useState(false);
  const [btnRequired, setBtnRequired] = useState(false);
  const postTextRef = useRef(null);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePostById,
    onMutate: post_id => {
      queryClient.setQueryData(['posts'], oldData => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          posts: oldData.posts.filter(p => p.post_id !== post_id),
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: error => {
      console.error(error.message);
    },
  });

  useEffect(() => {
    if (postTextRef.current) {
      const lineHeight = window
        .getComputedStyle(postTextRef.current)
        .getPropertyValue('line-height');
      const computedLineHeight = Number(lineHeight.replace('px', ''));
      const computedPostHeigh = postTextRef.current.offsetHeight;
      if (computedPostHeigh > computedLineHeight * 5) {
        setCollapsed(true);
        setBtnRequired(true);
      }
    }
  }, []);

  function toggleCollapsed() {
    setCollapsed(prevState => !prevState);
  }

  async function deletePost() {
    mutation.mutate(post.post_id);
  }

  return (
    <li className="post-wrapper" data-post-id={post.post_id}>
      <div>
        {user?.ismember && post?.username && (
          <p className="name">{`By ${post.username}`}</p>
        )}
        {user?.ismember && post?.created_at && (
          <p className="date">
            {`Posted: ${format(parseISO(post.created_at), 'yyyy-MM-dd, HH:mm')}`}
          </p>
        )}
        <div className="post">
          <div className="container-one">
            <div className="logo-container">
              <img src={noImage} className="logo" alt="No image" />
            </div>
            <h3 className="topic">{post.title}</h3>
          </div>
          <p
            ref={postTextRef}
            className={collapsed ? 'post-text collapsed' : 'post-text'}
          >
            {post.post}
          </p>
          {btnRequired && (
            <button
              onClick={toggleCollapsed}
              className={
                collapsed ? 'arrow-btn-wrapper' : 'arrow-btn-wrapper open'
              }
            >
              <DrowdownArrow className="dropdown-arrow" />
            </button>
          )}
        </div>
      </div>
      {user?.isadmin && (
        <button type="button" className="delete-button">
          <Trashcan className="trashcan" onClick={deletePost} />
        </button>
      )}
    </li>
  );
}

async function deletePostById(post_id) {
  const res = await fetch(`${API_BASE_URL}/api/posts/${post_id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json().catch(() => {
    throw new Error('Unexpected response from server. Please try again later.');
  });

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
