import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

const CourseCard = (props) => {
  const { id, title, description, images, teacher_name, subheadings } = props.item;
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      localStorage.setItem('enroll_status', localStorage.getItem('enroll_status') === "true" ? "false" : "true");
      console.log(localStorage.getItem('enroll_status'))
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


  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  return (
    <>{!isEnrolled && <div className="single__course__item">
      <div className="course__img h-50">
        <img src={images[0].image} alt="" className="w-100 h-100" />
      </div>

      <div className="course__details">
        <h6 className="course__title mb-1">{title}</h6>

        <div style={style}>
          <p className="lesson d-flex align-items-center gap-1">
            <i class="ri-book-open-line"></i> {description}
          </p>

        </div>
        <p className="students d-flex align-items-center gap-1 mb-3">
            <i class="ri-user-line"></i> {teacher_name}
          </p>


        <div>
          {isEnrolled ? (
          <Button>Continue</Button>
        ) : (
          <Button onClick={handleEnroll}>Enroll</Button>
        )}
        {error && <p>{error}</p>}
        </div>
      </div>
    </div>}</>
    
  );
};

export default CourseCard;
