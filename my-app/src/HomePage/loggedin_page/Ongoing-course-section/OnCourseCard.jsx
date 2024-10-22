

import EnrollButton from "./EnrollButton.js";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
function OnCourseCard(props) {
  const { id, title, description, images, teacher_name, subheadings } = props.item;
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to check enrollment status
  const checkEnrollment = async () => {
    try {
      const authTokens = localStorage.getItem('authTokens');
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      const response = await axios.get(`http://localhost:8000/api/courses/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setIsEnrolled(response.data.is_enrolled);
      setLoading(false);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      setError('Failed to check enrollment status');
      setLoading(false);
    }
  };

  // Function to handle enrollment
  const handleEnroll = async () => {
    try {
      const authTokens = localStorage.getItem('authTokens');
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      await axios.post(`http://localhost:8000/api/courses/${id}/enroll/`, {}, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setIsEnrolled(true);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setError('Failed to enroll in the course');
    }
  };

  useEffect(() => {
    checkEnrollment();
  }, [id]);

  if (loading) {
    return <button>Loading...</button>;
  }

  
  return (
    <>{isEnrolled && <Card className="mt-6 w-96" shadow="true" variant="filled" color="white">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={images[0].image}
          alt="card-image"
          className="w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-center justify-between">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {teacher_name}
        </Typography>
        </div>
        
        <Typography>
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div>
          {isEnrolled ? (
          <Button onClick={() => navigate(`/course/${id}`)}>Continue</Button>
        ) : (
          <Button onClick={handleEnroll}>Enroll</Button>
        )}
        {error && <p>{error}</p>}
        </div>
      </CardFooter>
    </Card>}</>
    
  );
}

export default OnCourseCard;
