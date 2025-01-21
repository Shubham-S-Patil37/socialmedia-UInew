import React, { useState, useEffect } from 'react';
import './EditProfileModal.css';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedName: string, updatedBio: string, updatedDob: string) => void;
  name: string;
  bio: string;
  dob: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, onSave, name, bio, dob }) => {

  if (!isOpen) return null
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedBio, setUpdatedBio] = useState(bio);
  const [updatedDob, setUpdatedDob] = useState(dob);

  useEffect(() => {
    setUpdatedName(name);
    setUpdatedBio(bio);
    setUpdatedDob(dob);
  }, [name, bio, dob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedName, updatedBio, updatedDob);
    onClose();
  };

  return (
    <div className="edit-modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name: <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          </label>
          <label>
            Bio: <textarea value={updatedBio} onChange={(e) => setUpdatedBio(e.target.value)} />
          </label>
          <label>
            DOB: <input type="text" value={updatedDob} onChange={(e) => setUpdatedDob(e.target.value)} />
          </label>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}> Cancel </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;