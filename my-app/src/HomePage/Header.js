import React, {useContext} from "react";
import ButtonComp from '../Components/Button';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import {
  RectangleGroupIcon,

} from "@heroicons/react/24/solid";
import {useNavigate } from "react-router-dom";
import logo from './assets/logo.jpeg'
import AuthService from '../authService';
import AuthContext from "../context/AuthContext";


const profileMenuItems = [
  {
    label: "Dashboard",
    icon: UserCircleIcon,
    link: "/dashboard/home"
  },
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/dashboard/profile"
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    link: "/dashboard/profile"
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    link: "/dashboard/notifications"
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    link: "https://github.com/Dhahlan3890"
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    link: "/"
  },
];

function ProfileMenu({profileImg}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={profileImg}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu();
                if (isLastItem) {
                  handleLogout();
                } else {
                  navigate(link);
                }
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const renderItems = (
    <>
      <div onClick={() => navigate("/dashboard/home")}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 " >
            {" "}
            {React.createElement(RectangleGroupIcon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
              
            >
              Courses
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
              
            >
              Discover a wide range of courses to enhance your skills.
            </Typography>
          </div>
        </MenuItem>
      </div>
      <div onClick={() => navigate("/dashboard/home")}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 " >
            {" "}
            {React.createElement(RectangleGroupIcon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
              
            >
              Projects
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
              
            >
              Explore projects that showcase your skills and achievements.
            </Typography>
          </div>
        </MenuItem>
      </div>
      <div onClick={() => navigate("/dashboard/tables")}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 " >
            {" "}
            {React.createElement(RectangleGroupIcon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
              
            >
              Teachers
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
              
            >
              Access resources and tools tailored for educators.
            </Typography>
          </div>
        </MenuItem>
      </div>
      </>
  );
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
 
function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}
 
function Header({profile_img}) {
  const [openNav, setOpenNav] = React.useState(false);
  const isAuthenticated = AuthService.isAuthenticated();
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-3xl px-4 py-2 " id="header">
      <div className="flex items-center justify-between text-blue-gray-900" id="navibar">
        <div id="brand">
          <img src={logo} alt="logo"></img>
          <Typography
            as="a"
            href="#"
            variant="h3"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 hidden lg:block"
            id="company-name"
          >
            eduZone
          </Typography>

        </div>

        {/* <div className="w-72">
          <Input label="Search Courses" icon={<i className="fas fa-search" />} />
        </div> */}
        
        <div className="hidden lg:block" id="nav">
          <NavList />
        </div>
        {isAuthenticated ? (
          <div className="hidden gap-2 lg:flex"> 
            <ProfileMenu profileImg={profile_img} /> 
          </div>
          ) : (
        <div className="hidden gap-2 lg:flex">
          <ButtonComp to="/Login">
            <Button variant="text" size="sm" color="blue-gray">
              Log In
            </Button>
          </ButtonComp>
          <ButtonComp to="/role">
            <Button variant="gradient" size="sm">
              Sign up
            </Button>
          </ButtonComp>
        </div>)}
        
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        {isAuthenticated ? (
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden"> 
            <ProfileMenu profileImg={profile_img} /> 
          </div>
          ) : (
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <ButtonComp to="/login">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth to="/Login">
              Log In
            </Button>
          </ButtonComp>
          <ButtonComp to="/role">
            <Button variant="gradient" size="sm" fullWidth to="/role">
              Sign up
            </Button>
          </ButtonComp>
        </div>)}
        
      </Collapse>
    </Navbar>
  );
}

export default Header;