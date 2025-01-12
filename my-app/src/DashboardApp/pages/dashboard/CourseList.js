import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StatisticsCard } from "../../widgets/cards/index";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;
      try {
        const response = await axios.get('http://localhost:8000/api/courses/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);


  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-2">
      
        {courses.map((course) => (
          <StatisticsCard
            key={course.id}
            value={course.title}  
            // {...rest}
            title={course.description}
            icon={<img src={course.images[0].image} className="w-12 h-12"></img>}
            // footer={
            //   <Typography className="font-normal text-blue-gray-600">
            //     <strong className="gray">{course.subheadings.length}</strong>
            //     &nbsp;subheadings
            //   </Typography>
            // }
          />
          
        ))}
      </div> 
      {/* {courses.map((course) => (
        <div key={course.id} style={{ marginBottom: '20px' }}>
          <h2 onClick={() => toggleCourseDetails(course.id)} style={{ cursor: 'pointer' }}>
            {course.title}
          </h2>
          <p>{course.description}</p>

          {selectedCourseId === course.id && (
            <div>

              <h4>Files</h4>
              {course.files.length > 0 ? (
                course.files.map((file) => (
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
              {course.images.length > 0 ? (
                course.images.map((image) => (
                  <img key={image.id} src={image.image} alt="course content" width="200" />
                ))
              ) : (
                <p>No images available</p>
              )}


              <h4>Videos</h4>
              {course.videos.length > 0 ? (
                course.videos.map((video) => (
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

export default CourseList;
