import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Typography } from "@material-tailwind/react";
import PdfImage from "../../../img/pdf.png";

// VerticalTabs Component for handling Videos within a Subtitle
function VerticalTabs({ subtitle }) {
  const data = subtitle.videos.length > 0 ? (
    subtitle.videos.map((video) => ({
      label: `Video ${video.id}`,
      value: video.id,
      desc: (
        <video className="h-full w-full rounded-lg" controls autoplay>
          <source src={video.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ),
    }))
  ) : (
    [{ label: "No videos available", value: "no-videos", desc: <p>No videos available</p> }]
  );

  return (
    <Tabs value={data[0].value} orientation="vertical">
      <TabsHeader className="w-32">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

// SubtitleTabs Component for handling Subtitles within a Course
function SubtitleTabs({ selectedCourse }) {
  const data = selectedCourse.subtitles.length > 0 ? (
    selectedCourse.subtitles.map((subtitle) => ({
      label: `${subtitle.title}`,
      value: subtitle.id,
      desc: (
        <div>
          <Typography variant="h5" color="blue-gray" className="mb-3">
              {subtitle.description}
          </Typography>
          <VerticalTabs subtitle={subtitle} />
          <div>
            <h4>Files</h4>
            {subtitle.files.length > 0 ? (
              subtitle.files.map((file) => (
                <div key={file.id}>
                  <a href={file.file} target="_blank" rel="noopener noreferrer">
                    <img src= {PdfImage} style={{width:"100px"}}/>
                    resource {file.id}
                  </a>
                </div>
              ))
            ) : (
              <p>No files available</p>
            )}
          </div>
          {/* <p>{subtitle.description}</p> */}
        </div>
      ),
    }))
  ) : (
    [{ label: "No subtitles available", value: "no-subtitles", desc: <p>No subtitles available</p> }]
  );

  return (
    <>
    <Typography variant="h1">{selectedCourse.title}</Typography>
    <Tabs value={data[0].value}>
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </>
  );
}

// Courseplay Component
export function Courseplay() {
  const { courseid } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const authTokens = localStorage.getItem("authTokens");
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;
      try {
        const response = await axios.get("http://localhost:8000/api/courses/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
        const course = response.data.find((course) => course.id.toString() === courseid);
        setSelectedCourse(course);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [courseid]);

  return (
    <div>
      {selectedCourse ? (
        <SubtitleTabs selectedCourse={selectedCourse} />
      ) : (
        <p>Loading course...</p>
      )}
    </div>
  );
}
