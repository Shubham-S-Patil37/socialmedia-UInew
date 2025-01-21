import React from 'react';
import './feedCard.css';

interface FeedCardProps {
  type: string;
  src: string;
  caption: string;
  username: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ type, src, caption, username }) => {
  return (
    <div className="feed-card">
      <div className="feed-username">{username}</div>

      {type === 'image' ? (
        <img src={src} alt="Feed Content" className="feed-media" />
      ) : (
        <video className="feed-media" controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="feed-caption">{caption}</div>
    </div>
  );
};

export default FeedCard;