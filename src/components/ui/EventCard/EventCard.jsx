// Components
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
  Stack,
} from "@chakra-ui/react";
import { NavigateButton } from "../../input";

// Utils
import { getDateData } from "../../../utils";

export const EventCard = ({
  id,
  title,
  description,
  image,
  categoryNames,
  startTime,
  endTime,
}) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={image}
        alt={title}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{`${title} (${getDateData(
            startTime,
            "date"
          )})`}</Heading>
          <Text fontSize={12} pb="2">
            {categoryNames}
          </Text>
          <Text>
            {`${getDateData(startTime, "time")} - ${getDateData(
              endTime,
              "time"
            )}`}
          </Text>
          <Text py="2">{description}</Text>
        </CardBody>

        <CardFooter>
          <NavigateButton
            variant="solid"
            colorScheme="blue"
            href={`/event/${id}`}
          >
            View event
          </NavigateButton>
        </CardFooter>
      </Stack>
    </Card>
  );
};
