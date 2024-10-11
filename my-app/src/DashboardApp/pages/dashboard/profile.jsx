import React, { useState, useEffect, useRef } from 'react';
import {
  Card, CardBody, Avatar, Typography, Tabs, TabsHeader, Tab, Switch, Tooltip, Button, Input, CardHeader, CardFooter
} from '@material-tailwind/react';
import { HomeIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, PencilIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ProfileInfoCard, MessageCard } from '../../widgets/cards/index';
import { platformSettingsData, conversationsData, projectsData } from '../../data/index';
import axiosInstance from '../../../context/axiosInstance';
const swal = require('sweetalert2');

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [profile_img, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProfileEditClick = () => {
    setIsProfileEditing(true);
  };

  const handleBlur = () => {
    if (isEditing || isProfileEditing) {
      setIsEditing(false);
      setIsProfileEditing(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      const response = await fetch('http://localhost:8000/api/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setProfileImg(data.profile_img);
        setLoading(false);
      } else {
        console.error('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    try{
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        setProfileImg(file);
        console.log("file image" , file);
      }

    }
    catch (error) {
      console.error('Error during save Profile:', error);
    }

    
    
  };

  useEffect(() => {
    // Log profileImg when it changes
    if (profile_img) {
      console.log("profile image", profile_img);
      handleUpdateProfile();
    }
  }, [profile_img]);

  

  const handleRemoveImage = () => {
    setProfile({
      ...profile,
      profile_img: '',
    });
    setImagePreview(null);
  };

  const handleUpdateProfile = async () => {
    setIsProfileEditing(false);
  
    const authTokens = localStorage.getItem('authTokens');
    const tokens = JSON.parse(authTokens);
    const token = tokens.access;
    const formData = new FormData();
  
    // Append required fields
    formData.append('full_name', profile.full_name);
    formData.append('bio', profile.bio);
    formData.append('institute', profile.institute);
    formData.append('profile_img', profile_img);
  
    // Append user field (assuming profile contains user ID)
    if (profile.user) {
      formData.append('user', profile.user);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await fetch('http://localhost:8000/api/profile/', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
  
        swal.fire({
          title: 'Profile updated successfully!',
          icon: 'success',
          toast: true,
          timer: 2000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to save Profile:', errorData);
  
        swal.fire({
          title: 'Failed to update profile.',
          icon: 'error',
          toast: true,
          timer: 2000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error during save Profile:', error);
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100" id="profile-card">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={imagePreview || (profile.profile_img && profile.profile_img.profile_img) || '/img/bruce-mars.jpeg'}
                  alt={profile.profile_username}
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  name="profile_img"
                  style={{ display: 'none' }}
                />
              </div>
              <div>
                <div className="flex">
                  <Typography variant="h5" color="blue-gray" className="mb-1" onClick={handleEditClick}>
                    {profile.profile_username}
                  </Typography>
                  <Button variant="text" size="sm" color="red" onClick={handleRemoveImage}>
                    Remove
                  </Button>
                </div>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  {profile.role}
                </Typography>
              </div>
            </div>
            {/* <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div> */}
          </div>
          <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Typography
                          key={label}
                          variant="body1"
                          className={`text-sm font-normal text-blue-gray-500 ${checked ? 'font-bold' : ''}`}
                        >
                          {label}
                        </Typography>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ProfileInfoCard
              title="Profile Information"
              description={
                isProfileEditing ? (
                  <Input label="Bio" size="lg" name="bio" value={profile.bio} onChange={handleInputChange} onBlur={handleBlur} />
                ) : (
                  <div>{profile.bio}</div>
                )
              }
              details={{
                'Full Name': isProfileEditing ? (
                  <Input label="Full Name" size="lg" name="full_name" value={profile.full_name} onChange={handleInputChange} onBlur={handleBlur} />
                ) : (
                  profile.full_name
                ),
                Email: profile.profile_email,
                Role: profile.role,
                Institute: isProfileEditing ? (
                  <Input label="Institute" size="lg" name="institute" value={profile.institute} onChange={handleInputChange} onBlur={handleBlur} />
                ) : (
                  profile.institute
                ),
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
              action={
                <div style={{ display: 'flex' }}>
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500 mt-2 mr-2" onClick={handleProfileEditClick} />
                  </Tooltip>
                  <Button variant="text" size="sm" color="red" onClick={handleUpdateProfile}>
                    Save
                  </Button>
                </div>
              }
            />
            {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Messsages
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        Reply
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div> */}
          </div>
          {/* <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-500">
              Architects design houses
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(({ img, title, description, tag, route, members }) => (
                <Card key={title} color="transparent" shadow={false}>
                  <CardHeader floated={false} color="gray" className="mx-0 mt-0 mb-4 h-64 xl:h-40">
                    <img src={img} alt={title} className="h-full w-full object-cover" />
                  </CardHeader>
                  <CardBody className="py-0 px-1">
                    <Typography variant="small" className="font-normal text-blue-gray-500">
                      {tag}
                    </Typography>
                    <Typography variant="h5" color="blue-gray" className="mt-1 mb-2">
                      {title}
                    </Typography>
                    <Typography variant="small" className="font-normal text-blue-gray-500">
                      {description}
                    </Typography>
                  </CardBody>
                  <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                    <Link to={route}>
                      <Button variant="outlined" size="sm">
                        View Project
                      </Button>
                    </Link>
                    <div>
                      {members.map(({ img, name }, key) => (
                        <Tooltip key={name} content={name}>
                          <Avatar src={img} alt={name} size="xs" variant="circular" className={`cursor-pointer border-2 border-white ${key === 0 ? '' : '-ml-2.5'}`} />
                        </Tooltip>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div> */}
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
