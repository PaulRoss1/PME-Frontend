import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const formatDate = (date: string | undefined) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (typeof date !== "undefined") {
    let dateArray = date.split("-");
    let formattedDate =
      dateArray[2] +
      " " +
      months[Number(dateArray[1]) - 1] +
      " " +
      dateArray[0];

    return formattedDate;
  }
};

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
