import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

interface CardProps {
  image: string;
  title?: string;
  description?: string;
}

const CardComponent: React.FC<CardProps> = ({ image, title, description }) => {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="white" className="h-63 relative">
        <img
          src={image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
