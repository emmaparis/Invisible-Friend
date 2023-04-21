import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

function Profile() {
  return (
    <div className="mainPage">
      <Card className="mainCard">
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
