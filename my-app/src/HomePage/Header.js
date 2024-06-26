import React from "react";
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
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import logo from './assets/logo.jpeg'
import { Input } from "@material-tailwind/react";
 
const navListMenuItems = [
  {
    title: "Courses",
    description: "Discover a wide range of courses to enhance your skills.",
    icon: RectangleGroupIcon,
  },
  {
    title: "About Us",
    description: "Learn more about our mission and values.",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Read articles and insights from industry experts.",
    icon: Bars4Icon,
  },
  {
    title: "Tutoring",
    description: "Get personalized help from our experienced tutors.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for any assistance or inquiries.",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Get in touch with us for more information.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Stay updated with the latest news and events.",
    icon: NewspaperIcon,
  },
  {
    title: "Library",
    description: "Access a vast collection of educational resources.",
    icon: SquaresPlusIcon,
  },
  {
    title: "Special Offers",
    description: "Explore our latest discounts and deals.",
    icon: TagIcon,
  },
];

 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
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
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
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
 
function Header() {
  const [openNav, setOpenNav] = React.useState(false);
 
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
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            id="company-name"
          >
            eduZone
          </Typography>

        </div>

        <div className="w-72">
          <Input label="Search Courses" icon={<i className="fas fa-search" />} />
        </div>

        
 


        
        
        <div className="hidden lg:block" id="nav">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <ButtonComp to="/Login">
            <Button variant="text" size="sm" color="blue-gray">
              Log In
            </Button>
          </ButtonComp>
          <ButtonComp to="/Signup">
            <Button variant="gradient" size="sm">
              Sign up
            </Button>
          </ButtonComp>
        </div>
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
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Log In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign In
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default Header;