import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useSelector } from "react-redux";

const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allContacts);
  const { user } = useSelector((store) => store.user);

  let defaultStats = [
    {
      title: "Friends",
      count: stats.friend || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Relative",
      count: stats.relative || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Other",
      count: stats.other || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  if (user.role === "admin") {
    defaultStats = [
      {
        title: "Contacts",
        count: stats.friend || 0,
        icon: <FaSuitcaseRolling />,
        color: "#e9b949",
        bcg: "#fcefc7",
      },
      {
        title: "Users",
        count: stats.relative || 0,
        icon: <FaCalendarCheck />,
        color: "#647acb",
        bcg: "#e0e8f9",
      },
    ];
  }

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
