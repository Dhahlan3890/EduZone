import Ibm from "../../img/ibm.png";
import Google from "../../img/google_logo.jpeg";
import Stanford from "../../img/stanford_logo.png"

export const statisticsCardsData = [
  {
    color: "gray",
    icon: Ibm,
    title: "IBM Cloud Basics",
    value: "Week 1",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: Google,
    title: "Google Python Basics",
    value: "Week 3",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: Stanford,
    title: "Stanford AI Basics",
    value: "Week 3",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: Google,
    title: "Advanced Python Programming",
    value: "Week 5",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than last week",
    },
  },
];

export default statisticsCardsData;
