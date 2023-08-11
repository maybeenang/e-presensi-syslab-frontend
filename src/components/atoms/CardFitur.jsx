import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const CardFitur = ({ title, icon, color, href }) => {
  return (
    <Link to={href}>
      <Card className={`w-64 rounded-sm bg-teal-50 ${color} cursor-pointer `}>
        <CardBody className="grid place-content-center p-3">
          <Typography color="white" className="text-[100px]">
            {icon}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-start justify-center gap-1 p-3 ">
          <Typography variant="h5" color="white" className="">
            {title}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};

CardFitur.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
