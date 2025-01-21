import React, { useState, FC } from "react";
import "./postUpload.css";
import { backendUrl } from "../../services/apiServices";
import axios from "axios";

interface PostUploadProps {
  onSubmit: (formData: FormData) => void;
}

const PostUpload: FC<PostUploadProps> = ({ onSubmit }) => {
  const [media, setMedia] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setMedia(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (media && caption.trim()) {
      const formData = new FormData();

      const fileSizeInMB: number = media.size / (1024 * 1024);
      const fileSize: string = fileSizeInMB.toFixed(2);

      formData.append('file', media);
      formData.append("fileName", media.name)
      formData.append("fileSize", fileSize)
      formData.append("caption", caption);

      const token = localStorage.getItem('accessToken')

      await axios.post(backendUrl + '/post/', formData, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Authorization': "Bearer " + token
        },
      });

      setMedia(null);
      setCaption("");
      setPreviewUrl(null);
    } else {

    }
  };

  return (
    <div className="post-upload-container">
      <form onSubmit={handleSubmit} className="post-upload-form">
        <div className="form-group">
          <label htmlFor="media-upload">Upload Media (Image/Video):</label>
          <input type="file" id="media-upload" accept="image/,video/" onChange={handleMediaChange} required className="media-input" />
          {previewUrl && (
            <div className="media-preview">
              <p>Media Preview:</p>
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="caption-input">Caption:</label>
          <input id="caption-input" type="text" value={caption} onChange={handleCaptionChange} placeholder="Write a caption..." required className="caption-input" />
        </div>
        <button type="submit" className="post-upload-btn"> Post </button>
      </form>
    </div>
  );
};

export default PostUpload;