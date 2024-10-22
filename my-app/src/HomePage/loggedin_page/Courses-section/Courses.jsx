import React from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../images/web-design.png";
import courseImg2 from "../images/graphics-design.png";
import courseImg3 from "../images/ui-ux.png";
import "./courses.css";
import CourseCard from "./CourseCard";
import axios from "axios";
import { useState, useEffect } from "react";

const coursesData = [
  {
    id: "01",
    title: "Web Design BootCamp-2022 for Beginners",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg1,
  },

  {
    id: "02",
    title: "Professional Graphics Design, PhotoShop, Figma",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg2,
  },

  {
    id: "03",
    title: "UI/UX BootCamp for Beginners in 2022",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg3,
  },
];

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

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authTokens = localStorage.getItem('authTokens'); 
        const tokens = JSON.parse(authTokens);
        const token = tokens.access;
        const response = await axios.get('http://localhost:8000/api/courses/', 
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
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">                
                <h2 style={headingStyles} >Recommended for You</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
                <button style={buttonStyle}>See All</button>
              </div>
            </div>
          </Col>
          <div className="courses-container" style={{display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)', /* 3 columns */gap: '20px'}}>
            {courses.map((item) => (
              <CourseCard key={item.id} item={item} style= {{padding: '20px',}}/>
            ))}
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
