import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./projects.css";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { useState, useEffect } from "react";


const headingStyles = {
  fontSize: '2rem',
  lineHeight: '50px',
  fontFamily: '"Poppins", sans-serif',
  color: '#0a2b1e',
  fontWeight: 600,
};

const buttonStyle = {
  background: '#000000',
  color: '#fff',
  padding: '7px 25px',
  borderRadius: '50px',
};

const ProjectsAll = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authTokens = localStorage.getItem('authTokens'); 
        const tokens = JSON.parse(authTokens);
        const token = tokens.access;
        const response = await axios.get('http://localhost:8000/api/projects/', 
          {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  return (
    <section  style={{ marginTop: '100px' }} >
      <Container>
        <Row>
          {courses.length > 0 && <Col lg="12" className="mb-5">
            <div className="project__top d-flex justify-content-between align-items-center">
              <div className="project__top__left w-50">                
                <h2 style={headingStyles} >Recommended Projects</h2>
                <p>
                  Explore cutting-edge projects tailored to your interests. Unlock new skills and knowledge.
                </p>
              </div>

              {/* <div className="w-50 text-end">
                <button style={buttonStyle}>View More</button>
              </div> */}
            </div>
          </Col>}
          <div className="courses-container" style={{display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)', /* 3 columns */gap: '20px'}}>
            {courses.map((item) => (
              <ProjectCard key={item.id} item={item} style= {{padding: '20px',}}/>
            ))}
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectsAll;
