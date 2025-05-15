import React from 'react';
import { ProviderData } from './ProviderProfileManagement';
import { Typography, Card, CardContent } from '@mui/material';

interface ProfileDetailsProps {
  provider: ProviderData | null;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ provider }) => {
  if (!provider) {
    return <Typography variant="h6">Provider details not available. Please add or select a provider.</Typography>
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Provider Details</Typography>
        <Typography variant="body1">Name: {provider.name}</Typography>
        <Typography variant="body1">Specialty: {provider.specialty}</Typography>
        <Typography variant="body1">Email: {provider.email}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;