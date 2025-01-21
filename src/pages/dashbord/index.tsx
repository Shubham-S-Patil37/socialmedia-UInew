import React, { useState, useEffect } from 'react';
import './dashbord.css';
import Sidebar from '../../components/sidebar';
import FeedCard from '../../components/feedCard';
import { FaPen } from 'react-icons/fa';
import { FaBirthdayCake } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


import EditProfileModal from '../../components/editProfileModal';
import ImageUploadModal from '../../components/imageUploadModal';
import apiService from '../../services/apiServices';
import PostUpload from '../../components/postUpload';
import { useNavigate } from 'react-router-dom';
import MessagePersonList from '../../components/messageList';

const Dashboard: React.FC = () => {
  interface userData { name: string, profilePic: string, bio: string, email: string, birthDate: string, posts: any[], contacts: number }
  interface feedObj { _id: string; type: string; media: string; caption: string; username: string }

  const [menuSelected, setMenuSelected] = useState("Feed");
  const [profile, setProfile] = useState<userData>({ name: "", profilePic: "", bio: "", email: "", birthDate: "", contacts: 0, posts: [] });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
  const [feedData, setFeedData] = useState<feedObj[]>([])
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [chatWith, setChatWith] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");

  const navigate = useNavigate();
  const names = ["John", "Jane", "Alice", "Bob"];

  const messages: any = {
    "John": [
      { received: "Hey John, are you free later?" },
      { send: "Yeah, I should be free around 5 PM." },
      { received: "Great, let's meet then!" },
      { send: "Looking forward to it!" }
    ],
    "Jane": [
      { received: "Hi Jane, how's the project going?" },
      { send: "Hey, it's going well! Just finishing up some final touches." },
      { received: "Awesome! Let me know if you need help." },
      { send: "Thanks, I might reach out in a bit." }
    ],
    "Alice": [
      { received: "Alice, do you have the notes from today's meeting?" },
      { send: "Yes, I do! I'll send them over shortly." },
      { received: "Perfect, thanks!" },
      { send: "You're welcome!" }
    ],
    "Bob": [
      { received: "Bob, do you want to grab lunch tomorrow?" },
      { send: "Sure, what time?" },
      { received: "How about 1 PM?" },
      { send: "Sounds good! See you then." }
    ]
  };


  useEffect(() => {

    if (menuSelected == "Profile") {
      apiService.getUserProfile().then((resp: any) => {
        if (resp.status) {
          const userData: userData = resp.data.data
          apiService.getUserPost()
            .then((resp: any) => {
              userData.posts = resp.data.data
              setProfile(userData)
            })
        }
      })
    }
    else if (menuSelected == "Feed") {
      apiService.userFeed()
        .then((resp: any) => {
          setFeedData(resp.data)
        })
    }
  }, [menuSelected]);


  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      // setErrorMessage("New password and confirm password do not match.");
    }
    else {
      const resp = await apiService.changePass(currentPassword, newPassword)
      if (resp.status)
        alert("Your password has been successfully updated!");
      else
        alert("Your password not match !");
    }

    // setCurrentPassword(newPassword);


    setErrorMessage("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveProfile = (updatedName: string, updatedBio: string, updatedDob: string) => {
    const data = { name: updatedName, bio: updatedBio, birthDate: updatedDob }
    setProfile(prevProfile => ({ ...prevProfile, data }));
    apiService.updateUserProfile(data)

  };

  const handleImageUpload = (file: File) => {
    setProfile(prevProfile => ({ ...prevProfile, profilePic: URL.createObjectURL(file), }));
  };

  const handlePostUpload = (formData: FormData) => {
    const file = formData.get("media") as File;
    const caption = formData.get("caption") as string;

    if (file) {
      const newPost = {
        id: profile.posts?.length + 1,
        type: file.type.startsWith("image/") ? "image" : "video",
        src: URL.createObjectURL(file),
        caption,
      };

      setProfile(prevProfile => ({ ...prevProfile, posts: [newPost, ...(prevProfile.posts)] }));

      setMenuSelected("Profile");
    }
  };

  const deactivateMyAccount = async () => {

    const confirmed = window.confirm("Are you sure you want to deactivate your account ?");

    if (confirmed) {
      const resp = await apiService.deactivateMyAccount()
      alert("Your account has been deactivated.")
      navigate("/login")
    }


  }

  const onChatChange = (name: string) => {
    const allChat = messages[name];
    setChatWith(allChat)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatWith([...chatWith, { send: newMessage }]); // Add new sent message to chat
      setNewMessage(""); // Clear input field
    }
  };

  return (
    <div className="dashboard-parent">
      <Sidebar setMenuClick={setMenuSelected} />
      <div className="dashboard-section">
        {
          menuSelected === "Feed" ? (
            <div className="feed-container">
              {feedData ?
                feedData.map((item: feedObj) =>
                  <FeedCard key={item._id} type={item.type} src={item.media} caption={item.caption} username={item.username} />
                ) : <h1>NO Data</h1>
              }
            </div>
          ) : menuSelected === "Profile" ? (
            <div className="profile-container">
              {/* Prof Header */}
              <div className="profile-header">
                <div className="profile-picture-container">
                  <img src={profile.profilePic} alt="Profile" className="profile-picture" />
                  <FaPen className="edit-icon" onClick={() => setIsImageUploadModalOpen(true)} />
                </div>
                <div className="profile-details">
                  <h1>{profile.name}</h1>
                  <p className="profile-bio">{profile.bio}</p>
                  <p className="profile-contact"><MdEmail /> {profile.email}</p>
                  <p className="profile-bio"><FaBirthdayCake /> {profile.birthDate}</p>
                </div>
              </div>

              <div className="profile-metrics">
                <div>
                  <h2>{profile.posts && profile.posts.length > 0 ? profile.posts.length : 0}</h2>
                  <p>Posts</p>
                </div>
                <div>
                  <h2>{profile.contacts ? profile.contacts : 0}</h2>
                  <p>Friends</p>
                </div>
                <button className="edit-profile-btn" onClick={() => setIsEditModalOpen(true)}>
                  Edit Profile
                </button>
              </div>
              <div className="grid-view">
                {profile.posts && profile.posts?.length > 0 ?
                  profile.posts.map((post: any) => (
                    <div key={post.id} className="post-card">
                      {post.type === "image" ? (
                        <img src={post.media} alt="Post Content" />
                      ) : (
                        <video controls>
                          <source src={post.media} type="video/mp4" />
                        </video>
                      )}
                      <p className="post-caption">{post.caption}</p>
                    </div>
                  )) : <></>
                }
              </div>
            </div>
          ) : menuSelected === "Upload" ? (
            <PostUpload onSubmit={handlePostUpload} />
          ) : menuSelected === "Message" ? (
            <div className='message-parent'>
              <MessagePersonList nameList={names} onChatChange={onChatChange} />
              <div className='message-section'>
                {
                  Array.isArray(chatWith) && chatWith.length > 0 ? (
                    chatWith.map((ele: any, index: number) => (
                      <div key={index} className={`message ${ele.received ? 'received-message' : 'send-message'}`}>
                        {ele.received ? (
                          <p className='right-overlay-panel-p'>{ele.received}</p>
                        ) : (
                          <p className='right-overlay-panel-p'>{ele.send}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No messages available</p>
                  )
                }
              </div>
              {
                Array.isArray(chatWith) && chatWith.length > 0 ? (
                  <div className="send-message-container">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" />
                    <button onClick={handleSendMessage}>Send</button>
                  </div>
                ) : (
                  <></>
                )
              }
            </div>
          ) : menuSelected === "Setting" ? (
            <div className="settings-container">
              {/* ==============================Update Pass======================== */}
              <div className="settings-card update-password-section">
                <h2>🔒 Update Password</h2>
                <form onSubmit={handleUpdatePassword}>
                  <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                  <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                  <button type="submit" className="primary-button"> Update Password </button>
                </form>
              </div>

              {/* ---------------====deactiveee=============================== */}
              <div className="settings-card deactivate-account-section">
                <h2>⚠ Deactivate Account</h2>
                <p>
                  If you deactivate your account, all your data, posts, and connections will be permanently deleted. This action cannot be undone.
                </p>
                <button
                  className="danger-button"
                  onClick={deactivateMyAccount}
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          ) : <></>
        }
      </div>

      {/* Modals */}
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveProfile} name={profile.name} bio={profile.bio} dob={profile.birthDate} />

      <ImageUploadModal isOpen={isImageUploadModalOpen} onClose={() => setIsImageUploadModalOpen(false)} onUpload={handleImageUpload} />
    </div>
  );
};

export default Dashboard;