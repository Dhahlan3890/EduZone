import React, { useEffect, useState } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
const swal = require('sweetalert2');

export function Notifications() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;
      await axios.post('http://localhost:8000/api/notifications/', {message}, 
        {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
       );
       swal.fire({
        title: 'Notification added successfully!',
        icon: 'success',
        toast: true,
        timer: 2000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setMessage('');
      fetchNotifications(); // Fetch notifications after adding a new one
    } catch (error) {
      console.error('Error adding notification:', error);
      swal.fire({
        title: 'Failed to add notification!',
        icon: 'error',
        toast: true,
        timer: 2000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const [notifications, setNotifications] = useState([]);
  const [notification_loading, setNotification_Loading] = useState(false);

  const fetchNotifications = async () => {
    setNotification_Loading(true);
    try {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;
      const response = await axios.get('http://localhost:8000/api/notifications/', 
        {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      setNotifications(response.data);
      setNotification_Loading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotification_Loading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
    
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
    <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Post a Message
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
        <form onSubmit={handleSubmit}>
          <Textarea
           placeholder="Enter notification message"
           value={message}
           onChange={(e) => setMessage(e.target.value)}
           required>

          </Textarea>
          
          <br />
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Post'}
          </Button>
        </form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Alerts
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          {notifications.map(notification => (
            <Alert
              key={notification.id}
              open={showAlerts["gray"]}
              color="gray"
              onClose={() => setShowAlerts((current) => ({ ...current, ["gray"]: false }))}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop:"20px" }}>
                <div style={{display:"flex"}}>
              {notification.message}
              </div>
              <div style={{display:"flex"}}>
                {notification.created_at}
              </div>
              </div>
            </Alert>
          ))}
        </CardBody>
      </Card>
    </div>
    </>
  );
}

export default Notifications;
