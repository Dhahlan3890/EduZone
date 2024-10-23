import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, Typography, Input, Textarea, Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const authTokens = localStorage.getItem('authTokens');
        const tokens = JSON.parse(authTokens);
        const token = tokens.access;

        const response = await axios.get(`http://localhost:8000/api/projects/${projectId}/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setProject(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching project:', error);
        Swal.fire('Error', 'Failed to fetch project details.', 'error');
      }
    };

    fetchProject();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authTokens = localStorage.getItem('authTokens');
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      await axios.put(`http://localhost:8000/api/projects/${projectId}/update_project/`, 
        { title, description },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      Swal.fire('Success', 'Project updated successfully!', 'success');
      navigate('/dashboard/home');
    } catch (error) {
      console.error('Error updating project:', error);
      Swal.fire('Error', 'Failed to update project.', 'error');
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader color="blue" className="relative h-56">
          <img
            src={project.images[0]?.image}
            alt="project"
            className="h-full w-full"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            Edit Project
          </Typography>
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
          />
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
          />
          <Button type="submit" color="blue" buttonType="filled" size="lg" rounded={false} block={true}>
            Update Project
          </Button>
        </CardBody>
      </Card>
    </form>
  );
};

export default EditProject;
