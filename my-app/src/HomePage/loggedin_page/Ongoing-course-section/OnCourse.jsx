import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import OnCourseCard from "./OnCourseCard.jsx";
import "./On-course.css";
import { Fade} from "react-awesome-reveal";

const headingStyles = {
  fontSize: '2rem',
  lineHeight: '50px',
  fontFamily: '"Poppins", sans-serif',
  color: '#0a2b1e',
  fontWeight: 600,
};

const OnCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollStatus, setEnrollStatus] = useState('true');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authTokens = localStorage.getItem('authTokens');
        const tokens = JSON.parse(authTokens);
        const token = tokens.access;

        const response = await axios.get('http://localhost:8000/api/courses/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [enrollStatus]); // Use enrollStatus in the dependency array

  useEffect(() => {
    const handleStorageChange = () => {
      setEnrollStatus(localStorage.getItem('enroll_status'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <section style={{ marginTop: '100px' }}>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 style={headingStyles}>Ongoing Courses</h2>
          </Col>

          <Fade duration={2000} direction="up">

          <div className="d-flex flex-wrap">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              courses.map((item) => (
                <div className="m-2" key={item.id}>
                  <OnCourseCard item={item} />
                </div>
              ))
            )}
          </div>
          </Fade>
        </Row>
      </Container>
    </section>
  );
};

export default OnCourse;
