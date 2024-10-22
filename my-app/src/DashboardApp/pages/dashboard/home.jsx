import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Textarea,
  Button,
  Input
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../widgets/cards/index";
import { StatisticsChart } from "../../widgets/charts/index";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "../../data/index";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import Ibm from "../../../img/ibm.png"
import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseUploadForm from "./CourseUploadForm";
import ProjectUploadForm from "./ProjectUpload";
import CourseList from "./CourseList";
import { useNavigate } from 'react-router-dom';
import StreamingApp from "./LiveStreaming";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';




export function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subheadings, setSubheadings] = useState([{ title: '' }]);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({});
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [studentProjects, setStudentProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentStatuses, setEnrollmentStatuses] = useState({});
  const navigate = useNavigate();
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const { GoogleGenerativeAI } = require("@google/generative-ai");



  const handleGPTSubmit = async () => {
    if (!input.trim()) return;

    // Add user's question to the conversation
    setConversation([...conversation, { sender: 'user', message: input }]);

    try {
      // Mocked GPT response, replace this with your API call
      const response = await fetchGPTResponse(input);

      // Add GPT's response to the conversation
      setConversation([...conversation, { sender: 'user', message: input }, { sender: 'gpt', message: response }]);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }

    setInput(''); // Clear the input field
  };

  const fetchGPTResponse = async (query) => {
    const genAI = new GoogleGenerativeAI("AIzaSyDDSwzN5o85ckkRVJXZEidq9zIPKIP8HtY");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(query);
    // Replace this with your actual API call to GPT
    return result.response.text();
  };

useEffect(() => {
  const checkEnrollments = async () => {
    try {
      const authTokens = localStorage.getItem('authTokens');
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      const statuses = {};
      for (const course of studentCourses) {
        const response = await axios.get(`http://localhost:8000/api/courses/${course.id}/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        statuses[course.id] = response.data.is_enrolled;
      }
      setEnrollmentStatuses(statuses);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      setError('Failed to check enrollment status');
      setLoading(false);
    }
  };

  checkEnrollments();
}, [studentCourses]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      // Fetch profile
      const profileResponse = await fetch('http://localhost:8000/api/profile/', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setProfile(profileData);
        setLoading(false);

        // Fetch projects
        const projectsResponse = await axios.get('http://localhost:8000/api/projects/', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        console.log("Projects Data:", projectsResponse.data); // Check the structure of the projects data

        const filteredProjects = projectsResponse.data.filter(project => project.teacher_name === profileData.profile_username);
        setStudentProjects(projectsResponse.data);
        setProjects(filteredProjects);

        // Fetch courses
        const coursesResponse = await axios.get('http://localhost:8000/api/courses/', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const filteredCourses = coursesResponse.data.filter(course => course.teacher_name === profileData.profile_username);
        setStudentCourses(coursesResponse.data);
        setCourses(filteredCourses);

        console.log("Course Data:", coursesResponse.data);

        
        // setProjects(filteredProjects);
      } else {
        console.error('Failed to fetch profile');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      const response = await axios.get('http://localhost:8000/api/projects/', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      console.log("Projects Data:", response.data); // Check the structure of the projects data

      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  fetchProjects();
}, []);

  

  const handleOpenNewTab = () => {
      const newTabUrl = `${window.location.origin}/streaming/${profile.profile_username}/${profile.profile_username}/${profile.full_name}`;
      window.open(newTabUrl, '_blank'); // Open in a new tab
  };
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  

  return (
    <>
    
    
    <div className="mt-12">
      {profile.role === 'teacher' ? (
        <>
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-1">

        <Button onClick={handleOpenNewTab}>Start Streaming</Button>

        <CourseUploadForm />

        <ProjectUploadForm/>
          
        </div>
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-2">
      
        {courses.map((course) => (
          <>
          <StatisticsCard
            key={course.id}
            value={course.title}  
            title={course.description.length > 50 ? course.description.substring(0, 50) + "..." : course.description}
            icon={<img src={course.images[0].image} className="w-12 h-12"></img>}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className="gray">{course.teacher_name}</strong>
                &nbsp;
              </Typography>
            }
          />
          <Button onClick={() => navigate(`/course/${course.id}`)}>See course</Button>
          </>
        ))}

        {/* {projects.map((project) => (
          <>
          <StatisticsCard
            key={project.id}
            value={project.title}  
            title={project.description.length > 50 ? project.description.substring(0, 50) + "..." : project.description}
            icon={project.images && <img src={project.images[0].image} className="w-12 h-12"></img>}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className="gray">{project.teacher_name}</strong>
                &nbsp;
              </Typography>
            }
          />
          <Button onClick={() => navigate(`/project/${project.id}`)}>See project</Button>
          </>
        ))} */}
      </div> 
      </>

        ) : <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-2">
        {studentCourses.map((course) => (
          enrollmentStatuses[course.id] && (
            <>
            <StatisticsCard
              key={course.id}
              value={course.title}
              title={course.description.length > 50 ? course.description.substring(0, 50) + "..." : course.description}
              icon={<img src={course.images[0].image} className="w-12 h-12" alt="course" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className="gray">{course.teacher_name}</strong>
                </Typography>
              }
            />
            <Button onClick={() => navigate(`/course/${course.id}`)}>See course</Button>
            </>
          )
        ))}

        {/* {studentProjects.map((project) => (
          enrollmentStatuses[project.id] && (
            <>
            <StatisticsCard
              key={project.id}
              value={project.title}
              title={project.description.length > 50 ? project.description.substring(0, 50) + "..." : project.description}
              icon={<img src={project.images[0].image} className="w-12 h-12" alt="project" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className="gray">{project.teacher_name}</strong>
                </Typography>
              }
            />
            <Button onClick={() => navigate(`/project/${project.id}`)}>See project</Button>
            </>
          )
        ))} */}
      </div> }

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
      {projects.map((project) => (
  <Card key={project.id} className="mb-4 border border-blue-gray-100 shadow-sm">
    <CardHeader floated={false} className="flex items-center p-4">
      {project.images && (
        <img
          src={project.images[0].image}
          className="w-12 h-12 mr-4"
          alt="Project image"
        />
      )}
      <div>
        <Typography variant="h6" color="blue-gray" className="font-bold">
          {project.title}
        </Typography>
        <Typography variant="small" className="text-blue-gray-600">
          {project.description.length > 50
            ? project.description.substring(0, 50) + "..."
            : project.description}
        </Typography>
      </div>
    </CardHeader>

    <CardBody>
      <Typography className="text-sm text-blue-gray-600">
        <strong>{project.teacher_name}</strong>
      </Typography>
    </CardBody>


      <Button onClick={() => navigate(`/project/${project.id}`)}>
        See project
      </Button>

  </Card>
))}
      </div>
        <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 p-6"
      >
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Eduzone GPT
        </Typography>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="min-h-screen">
          <Input
            label="Ask me"
            icon={<button onClick={handleGPTSubmit}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg></button>}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGPTSubmit()}
          />
          <div className="mt-3 mb-4">
            {conversation.map((chat, index) => (
              <Typography key={index} className={`mb-2 ${chat.sender === 'user' ? 'text-blue-gray-700' : 'text-blue-gray-500'}`}>
                <strong>{chat.sender === 'user' ? 'You:' : 'Eduzone GPT:'}</strong> {chat.message}
              </Typography>
            ))}
          </div>
          
        </div>
      </CardBody>
    </Card>

    </div>
    </>
  );
}

export default {Home,StreamingApp };

