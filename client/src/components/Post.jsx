import { format, parseISO } from 'date-fns';
import noImage from '../assets/images/noImage.jpg';

export default function Post({ post, authorized }) {
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
      <div className="trashcan"></div>
    </li>
  );
}
