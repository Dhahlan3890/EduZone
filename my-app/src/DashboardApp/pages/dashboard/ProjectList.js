import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;
      try {
        const response = await axios.get('http://localhost:8000/api/projects/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <Typography variant="h5" color="blue-gray" className="mb-4">
        Projects
      </Typography>
      {projects.map((project) => (
        <Card key={project.id} className="mb-4">
          <CardHeader>
            <Typography variant="h6">{project.title}</Typography>
          </CardHeader>
          <CardBody>
            <Typography>{project.description}</Typography>
            <Link to={`/projects/${project.id}`}>View Project</Link>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
