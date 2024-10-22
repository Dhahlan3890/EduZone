import { Carousel, Typography, Button } from "@material-tailwind/react";
import {useNavigate } from "react-router-dom";
 
function CarouselCard() {
    const navigate = useNavigate();
  return (
    <Carousel className="rounded-xl mr-1 ml-1" autoplay loop>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image 1"
          className="h-full w-full object-cover"
          style={{height:"600px"}}
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Start Teaching Online Today
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Share your expertise with a global audience. Start your online teaching journey today and make a meaningful impact on learners worldwide.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white" onClick={() =>navigate("/dashboard/home")}>
                Dashboard
              </Button>
              {/* <Button size="lg" color="white" variant="text">
                Gallery
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1692598504819-3c910911767f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image 1"
          className="h-full w-full object-cover"
          style={{height:"600px"}}
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Earn Extra income by sharing your knowledge
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Earn extra income by sharing your expertise with a global audience. Turn your knowledge into a rewarding experience while making a meaningful impact on learners worldwide.
            </Typography>

          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image 1"
          className="h-full w-full object-cover"
          style={{height:"600px"}}
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Monetize your knowledge educate, inspire, and earn while making a difference."
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Unlock the potential of your expertise by teaching others. As an educator on our platform, you can easily turn your passion into profit. Share your insights, reach a global audience, and earn extra income, all while helping others grow and learn. It's more than just teaching; it's about creating value for yourself and your students.
            </Typography>
          </div>
        </div>
      </div>
      
    </Carousel>
  );
}


export default CarouselCard;