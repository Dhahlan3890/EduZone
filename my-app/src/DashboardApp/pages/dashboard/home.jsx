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
import Swal from 'sweetalert2';




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
  const [projectEnrollmentStatuses, setProjectEnrollmentStatuses] = useState({});
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

      const courseStatuses = {};
      for (const course of studentCourses) {
        const response = await axios.get(`http://localhost:8000/api/courses/${course.id}/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        courseStatuses[course.id] = response.data.is_enrolled;
      }
      setEnrollmentStatuses(courseStatuses);

      const projectStatuses = {};
      for (const project of studentProjects) {
        const response = await axios.get(`http://localhost:8000/api/projects/${project.id}/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        projectStatuses[project.id] = response.data.is_enrolled;
      }
      setProjectEnrollmentStatuses(projectStatuses);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      setError('Failed to check enrollment status');
      setLoading(false);
    }
  };

  checkEnrollments();
}, [studentCourses, studentProjects]);


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
    // const newTabUrl = `${window.location.origin}/streaming/${profile.profile_username}/${profile.profile_username}/${profile.full_name}`;
      const newTabUrl = `${window.location.origin}/liveapp`;
      window.open(newTabUrl, '_blank'); // Open in a new tab
  };
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteCourse = async (courseId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const authTokens = localStorage.getItem('authTokens');
        const tokens = JSON.parse(authTokens);
        const token = tokens.access;

        await axios.delete(`http://localhost:8000/api/courses/${courseId}/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        setCourses(courses.filter(course => course.id !== courseId));
        Swal.fire('Deleted!', 'Your course has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      Swal.fire('Error', 'Failed to delete the course.', 'error');
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const authTokens = localStorage.getItem('authTokens');
        const tokens = JSON.parse(authTokens);
        const token = tokens.access;

        await axios.delete(`http://localhost:8000/api/projects/${projectId}/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        setProjects(projects.filter(project => project.id !== projectId));
        Swal.fire('Deleted!', 'Your project has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      Swal.fire('Error', 'Failed to delete the project.', 'error');
    }
  };

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
          <div>
          <StatisticsCard
            key={course.id}
            value={course.title}  
            title={course.description.length > 50 ? course.description.substring(0, 50) + "..." : course.description}
            icon={<img src={course.images[0].image} className="w-12 h-12"></img>}
            footer={
              <>
              <Typography className="font-normal text-blue-gray-600">
                <strong className="gray">{course.teacher_name}</strong>
                &nbsp;
              </Typography>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop:"20px" }}>
              <Button onClick={() => navigate(`/course/${course.id}`)}>See course</Button>
              <div style={{display:"flex"}}>
              <svg onClick={() => navigate(`/edit-course/${course.id}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer ml-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              
              <svg onClick={() => handleDeleteCourse(course.id)} xmlns="http://www.w3.org/2000/svg" color="red" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer ml-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              </div>
              
            </div>
            </>
            }
          />
          </div>
          </>
          
        ))}

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

          <div className="flex space-x-2 p-4">
            <Button onClick={() => navigate(`/project/${project.id}`)}>
              See project
            </Button>
            <Button onClick={() => navigate(`/edit-project/${project.id}`)}>
              Edit
            </Button>
            <Button onClick={() => handleDeleteProject(project.id)} color="red">
              Delete
            </Button>
          </div>

        </Card>
      ))}
            </div>
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

        {studentProjects.map((project) => (
          projectEnrollmentStatuses[project.id] && (
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
          )
        ))}
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
