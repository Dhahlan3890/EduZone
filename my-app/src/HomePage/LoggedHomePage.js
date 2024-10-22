import React, {useContext, useState, useEffect} from 'react';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import Block1 from './loggedin_page/Block1';
import Faqs4 from './loggedin_page/FAQ.js';
import Courses from './loggedin_page/Courses-section/Courses.jsx';
import OnCourse from './loggedin_page/Ongoing-course-section/OnCourse.jsx';
import Category from './loggedin_page/Category.jsx';
import Projects from './loggedin_page/Projects.jsx';
import CreateCourse from './course_management/courseCreate.js';
import Enrollment from './course_management/enrolment.js';
import axiosInstance from '../context/axiosInstance.js';
import Home from './Home.js';
import TeacherHome from './TeacherHome.js';
import CarouselCard from './Caroseal.js';
import { Button, Typography } from "@material-tailwind/react";
import ProjectsAll from './loggedin_page/projects/Projects.jsx';

function LoggedHomePage() {

  const [profile, setProfile] = useState({
    full_name: '',
    bio: '',
    verified: false,
    role: '',
    institute: '',
    profile_username: '',
    profile_email: '',
    profile_img: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/profile/');
        setProfile(response.data);
        localStorage.setItem('role', profile.role);
        
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const role = profile.role;

  const handleOpenNewTab = () => {
    // const newTabUrl = `${window.location.origin}/streaming/${profile.profile_username}/${profile.profile_username}/${profile.full_name}`;
      const newTabUrl = `${window.location.origin}/liveapp`;
      window.open(newTabUrl, '_blank'); // Open in a new tab
  };

  
  return (
    <div className="homepage">
      {role === 'student' && <div className="relative h-full w-full">
        <img
          src="https://plus.unsplash.com/premium_photo-1678112180480-a4169c601fa1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image 1"
          className="w-full object-cover"
          style={{height:"500px"}}
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Unlock Your Streaming Potential
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              "The best way to predict your future is to create it." - Abraham Lincoln. Start creating your future today by sharing your knowledge and passion with the world through live streaming.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white" onClick={handleOpenNewTab}>
                Start Streaming
              </Button>
            </div>
          </div>
        </div>
      </div>}
      {role === 'teacher' && <CarouselCard/>}
      {/* {profile.profile_img.profile_img ? (<Header profile_img={profile.profile_img.profile_img }/>) : (<Header profile_img="https://docs.material-tailwind.com/img/face-2.jpg"/>)} */}
      {profile.profile_img !== null && <Header profile_img={profile.profile_img.profile_img }/>}
      {profile.profile_img === null && <Header profile_img="https://docs.material-tailwind.com/img/face-2.jpg"/>}
      {/* {role === 'teacher' && <TeacherHome/>} */}
      {role !== 'teacher' && <OnCourse/>}
      {/* {role === 'teacher' && <CreateCourse />}
      {role === 'student' && <Enrollment />} */}
      {role !== 'teacher' && <Courses/>}
      {role !== 'teacher' && <ProjectsAll/>}
      {/* <Category/> */}
      {/* <Projects/> */}
      <Block1/>
      <Faqs4/>
      <Footer />
      
    </div>
    
  );
}

export default LoggedHomePage;
