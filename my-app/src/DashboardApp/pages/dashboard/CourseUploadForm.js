// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, CardHeader, CardBody, Typography, Input, Textarea, Button } from '@material-tailwind/react';

// const CourseUploadForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [files, setFiles] = useState([]);
//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);  // Start loading

//     const authTokens = localStorage.getItem('authTokens'); 
//     const tokens = JSON.parse(authTokens);
//     const token = tokens.access;

//     let formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);

//     files.forEach(file => formData.append('files', file));
//     images.forEach(image => formData.append('images', image));
//     videos.forEach(video => formData.append('videos', video));

//     for (let pair of formData.entries()) {
//         console.log(pair[0] + ': ' + pair[1]);
//       }

//     try {
//       const response = await axios.post('http://localhost:8000/api/courses/', formData, {
//         headers: { 'Content-Type': 'multipart/form-data', 
//           'Authorization': `Bearer ${token}`,
//          },
//       });
//       console.log('Course uploaded:', response.data);
//       setUploadStatus('Upload successful!');
//     } catch (error) {
//       console.error(error);
//       setUploadStatus('Error uploading course.');
//     } finally {
//       setLoading(false);  // Stop loading
//     }
//   };

//   return (
//      <form onSubmit={handleSubmit}>
  
//         <Card>
//           <CardHeader
//             color="transparent"
//             floated={false}
//             shadow={false}
//             className="m-0 p-4"
//           >
//             <Typography variant="h5" color="blue-gray">
//               Create Course
//             </Typography>
//           </CardHeader>
//           <CardBody className="flex flex-col gap-4 p-4">
          
            
//             <Input
//             label="Title"
//             type="text"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required>
//             </Input>
//             <Textarea
//             label="description"
//              name="description"
//              value={description}
//              onChange={(e) => setDescription(e.target.value)}
//              required>
  
//             </Textarea>
  
//             {/* <Typography variant="h6" color="blue-gray">
//               Subheadings
//             </Typography>
  
//             {subheadings.map((subheading, index) => (
//               <div key={index}>
//                 <Input
//                 label="Subheading Title"
//                 type="text"
//                 name="title"
//                 value={subheading.title}
//                 onChange={(e) => handleSubheadingChange(index, e)}
//                 required>
//                 </Input>
//                 <br />
//                 <Button
//                 type="button" onClick={() => handleRemoveSubheading(index)}>
//                   Remove
//                 </Button>
                
//               </div>
//             ))}
  
//             <Button type="button" onClick={handleAddSubheading}>
//               Add Subheading
//             </Button> */}
//             <Input
//             label="Related Documents"
//             type="file"
//             name="douments"
//             multiple
//             onChange={(e) => setFiles([...e.target.files])}
//             accept=".doc,.pdf,.ppt"
//             >
//             </Input>

//             <Input
//             label="Thubnail"
//             type="file"
//             name="images"
//             multiple
//             onChange={(e) => setImages([...e.target.files])}
//             accept="image/*"
//             >
//             </Input>

//             <Input
//             label="Videos"
//             type="file"
//             name="videos"
//             multiple
//             onChange={(e) => setVideos([...e.target.files])}
//             accept="video/*"
//             >
//             </Input>
  
            
//             <br />
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Uploading...' : 'Create Course'}
//             </Button>

//             {loading && <p>Uploading... Please wait.</p>}
//             {uploadStatus && <p>{uploadStatus}</p>}
          
//           </CardBody>
//         </Card>
  
//         </form> 
//     // <form onSubmit={handleSubmit}>
//     //   <input
//     //     type="text"
//     //     value={title}
//     //     onChange={(e) => setTitle(e.target.value)}
//     //     placeholder="Course Title"
//     //     required
//     //   />
//     //   <textarea
//     //     value={description}
//     //     onChange={(e) => setDescription(e.target.value)}
//     //     placeholder="Course Description"
//     //     required
//     //   />
//     //   <input
//     //     type="file"
//     //     multiple
//     //     onChange={(e) => setFiles([...e.target.files])}
//     //     accept=".doc,.pdf,.ppt"
//     //   />
//     //   <input
//     //     type="file"
//     //     multiple
//     //     onChange={(e) => setImages([...e.target.files])}
//     //     accept="image/*"
//     //   />
//     //   <input
//     //     type="file"
//     //     multiple
//     //     onChange={(e) => setVideos([...e.target.files])}
//     //     accept="video/*"
//     //   />
//     //   <button type="submit" disabled={loading}>
//     //     {loading ? 'Uploading...' : 'Upload Course'}
//     //   </button>

//     //   {/* Loading or Status Message */}
//     //   {loading && <p>Uploading... Please wait.</p>}
//     //   {uploadStatus && <p>{uploadStatus}</p>}
//     // </form>
//   );
// };

// export default CourseUploadForm;


import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Typography, Input, Textarea, Button, IconButton } from '@material-tailwind/react';
// import { PlusIcon, TrashIcon } from '@heroicons/react/solid';
const swal = require('sweetalert2')

const CourseUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtitles, setSubtitles] = useState([
    { subtitleTitle: '', subtitleDescription: '', files: [], videos: [] },
  ]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [images, setImages] = useState([]);

  const handleSubtitleChange = (index, field, value) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index][field] = value;
    setSubtitles(newSubtitles);
  };

  const handleFileChange = (index, field, files) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index][field] = files;
    setSubtitles(newSubtitles);
  };

  const addSubtitle = () => {
    setSubtitles([...subtitles, { subtitleTitle: '', subtitleDescription: '', files: [], videos: [] }]);
  };

  const removeSubtitle = (index) => {
    const newSubtitles = subtitles.filter((_, i) => i !== index);
    setSubtitles(newSubtitles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const authTokens = localStorage.getItem('authTokens'); 
    const tokens = JSON.parse(authTokens);
    const token = tokens.access;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach(image => formData.append('images', image));

    subtitles.forEach((subtitle, i) => {
      formData.append(`subtitles[${i}][title]`, subtitle.subtitleTitle);
      formData.append(`subtitles[${i}][description]`, subtitle.subtitleDescription);
      subtitle.files.forEach(file => formData.append(`subtitles[${i}][files]`, file));
      subtitle.videos.forEach(video => formData.append(`subtitles[${i}][videos]`, video));
    });

    for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }

    try {
      const response = await axios.post('http://localhost:8000/api/courses/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Course uploaded:', response.data);
      setUploadStatus('Upload successful!');
      swal.fire({
        title: "Course Upload successful!",
        icon: "success",
        toast: true,
        timer: 2000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false
    })
    } catch (error) {
      console.error(error);
      setUploadStatus('Error uploading course.');
      swal.fire({
        title: "Error uploading course.",
        icon: "error",
        toast: true,
        timer: 2000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false
    })
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader color="transparent" floated={false} shadow={false} className="m-0 p-4">
          <Typography variant="h5" color="blue-gray">
            Create Course
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          <Input
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

            <Input
            label="Thubnail"
            type="file"
            name="images"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            accept="image/*"
            required
            >
            </Input>

          {subtitles.map((subtitle, index) => (
            <div key={index} className="subtitle-section">
              <Typography variant="h6" color="blue-gray">
                Subtitle {index + 1}
              </Typography>
              <Input
                label="Subtitle Title"
                type="text"
                value={subtitle.subtitleTitle}
                onChange={(e) => handleSubtitleChange(index, 'subtitleTitle', e.target.value)}
                required
              />
              <Textarea
                label="Subtitle Description"
                value={subtitle.subtitleDescription}
                onChange={(e) => handleSubtitleChange(index, 'subtitleDescription', e.target.value)}
                required
              />
              <Input
                label="Subtitle Files"
                type="file"
                multiple
                onChange={(e) => handleFileChange(index, 'files', [...e.target.files])}
                accept=".doc,.pdf,.ppt"
              />
              <Input
                label="Subtitle Videos"
                type="file"
                multiple
                onChange={(e) => handleFileChange(index, 'videos', [...e.target.files])}
                accept="video/*"
              />
              {index > 0 && (
                <IconButton
                  color="red"
                  size="sm"
                  onClick={() => removeSubtitle(index)}
                  className="mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </IconButton>
              )}
              <hr className="my-4" />
            </div>
          ))}

          <Button color="blue-gray" variant="outlined" onClick={addSubtitle}>
            Add Subtitle
            
          </Button>

          <Button type="submit" disabled={loading} className="mt-4">
            {loading ? 'Uploading...' : 'Create Course'}
          </Button>

          {loading && <p>Uploading... Please wait.</p>}
          {uploadStatus && <p>{uploadStatus}</p>}
        </CardBody>
      </Card>
    </form>
  );
};

export default CourseUploadForm;
