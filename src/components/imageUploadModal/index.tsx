import React from 'react';
import { backendUrl } from '../../services/apiServices';
import axios from 'axios';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  if (!isOpen) return null;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files;
      const fileObj = file?.[0];

      const fileSizeInMB: number = fileObj.size / (1024 * 1024);

      if (fileSizeInMB > 15) {
        alert("File size is too large. Please select a file less than 15MB");
      }
      else {
        const fileSize: string = fileSizeInMB.toFixed(2);
        const formData = new FormData();
        formData.append('file', fileObj);
        formData.append("fileName", fileObj.name)
        formData.append("fileSize", fileSize)

        const token = localStorage.getItem('accessToken')

        await axios.post(backendUrl + '/user/uploadProfilePic/', formData, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': "Bearer " + token
          },
        });
      }

      onUpload(e.target.files[0]);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ImageUploadModal;