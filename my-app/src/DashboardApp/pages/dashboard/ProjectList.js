import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { StatisticsCard } from "../../widgets/cards/index";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;
      try {
        const response = await axios.get('http://localhost:8000/api/projects/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const toggleProjectDetails = (projectId) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };

  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-2">
      
        {projects.map((project) => (
          <StatisticsCard
            key={project.id}
            value={project.title}  
            // {...rest}
            title={project.description}
            icon={<img src={project.images[0].image} className="w-12 h-12"></img>}
            // footer={
            //   <Typography className="font-normal text-blue-gray-600">
            //     <strong className="gray">{project.subheadings.length}</strong>
            //     &nbsp;subheadings
            //   </Typography>
            // }
          />
          
        ))}
      </div> 
      {/* {projects.map((project) => (
        <div key={project.id} style={{ marginBottom: '20px' }}>
          <h2 onClick={() => toggleProjectDetails(project.id)} style={{ cursor: 'pointer' }}>
            {project.title}
          </h2>
          <p>{project.description}</p>

          {selectedProjectId === project.id && (
            <div>

              <h4>Files</h4>
              {project.files.length > 0 ? (
                project.files.map((file) => (
                  <div key={file.id}>
                    <a href={file.file} target="_blank" rel="noopener noreferrer">
                      {file.file.split('/').pop()}
                    </a>
                  </div>
                ))
              ) : (
                <p>No files available</p>
              )}


              <h4>Images</h4>
              {project.images.length > 0 ? (
                project.images.map((image) => (
                  <img key={image.id} src={image.image} alt="project content" width="200" />
                ))
              ) : (
                <p>No images available</p>
              )}


              <h4>Videos</h4>
              {project.videos.length > 0 ? (
                project.videos.map((video) => (
                  <div key={video.id}>
                    <video width="400" controls>
                      <source src={video.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))
              ) : (
                <p>No videos available</p>
              )}
            </div>
          )}
        </div>
      ))} */}
    </div>
  );
};

export default ProjectList;
