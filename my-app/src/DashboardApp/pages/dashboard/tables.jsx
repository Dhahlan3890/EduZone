import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

export function Tables() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const authTokens = localStorage.getItem('authTokens'); 
        const tokens = JSON.parse(authTokens);
        const token = tokens.access;

        const response = await axios.get('http://localhost:8000/api/profiles/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const filteredProfiles = response.data.filter(profile => profile.role === 'teacher');

        setProfiles(filteredProfiles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Define authorsTableData based on loading state
  let authorsTableData = loading
    ? [...Array(5)].map((_, index) => ({
        img: "https://via.placeholder.com/150",
        name: "Loading...",
        email: "Loading...",
        job: ["Loading...", "Loading..."],
        online: true,
        date: "23/04/18",
        key: index.toString() // Add a unique key for each item
      }))
    : profiles.map((profile) => ({
        img: (profile.profile_img && profile.profile_img.profile_img) || '/img/bruce-mars.jpeg',
        name: profile.profile_username,
        email: profile.profile_email,
        job: [profile.institute],
        online: true,
        date: "23/04/18",
        key: profile.id.toString() // Assuming profile.id is unique and can be used as a key
      }));

  let projectsTableData = loading
  ? [...Array(4)].map((_, index) => ({
      img: "https://via.placeholder.com/150",
      name: "Loading...",
      members: [], // Initialize as an empty array
      budget: "Loading...",
      completion: 0,
      key: index.toString() // Add a unique key for each item
    }))
  : courses.map((course) => ({
      img: course.images[0].image,
      name: course.title,
      members: Array.isArray(course.subtitles) ? course.subtitles.map((subtitle) => ({
        img: "/img/team-1.jpeg", // Replace with actual image if available
        name: subtitle.title
      })) : [], // Ensure members is an empty array if subtitles is not an array
      budget: course.teacher_name,
      completion: course.created_at.split('T')[0], // Assuming 100% completion for simplicity
      key: course.id.toString() // Assuming course.id is unique and can be used as a key
    }));

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Educators
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["author", "function", "status", "employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(({ img, name, email, job, online, date, key }) => (
                <tr key={key}>
                  <td className={`py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <div className="flex items-center gap-4">
                      <Avatar src={img} alt={name} size="sm" variant="rounded" />
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {name}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {job[0]}
                    </Typography>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {job[1]}
                    </Typography>
                  </td>
                  <td className={`py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Chip
                      variant="gradient"
                      color={online ? "green" : "blue-gray"}
                      value={online ? "online" : "offline"}
                      className="py-0.5 px-2 text-[11px] font-medium w-fit"
                    />
                  </td>
                  <td className={`py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {date}
                    </Typography>
                  </td>
                  <td className={`py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                    <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600">
                      Edit
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            All Courses
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Title", "Subtitles", "Teacher", "Created", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion, key }) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {Array.isArray(members) ? members.map(({ img, name }, memberKey) => (
                          <Tooltip key={memberKey} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                memberKey === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        )) : (
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            No Subtitles
                          </Typography>
                        )}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="mb-1 block text-xs font-medium text-blue-gray-600"
                        >
                          {completion}
                        </Typography>
                        <Progress
                          value={completion}
                          variant="gradient"
                          color={completion === 100 ? "green" : "gray"}
                          className="h-1"
                        />
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
