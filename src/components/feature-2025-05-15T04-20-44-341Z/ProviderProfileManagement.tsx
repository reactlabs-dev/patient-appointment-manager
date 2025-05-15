import React from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileForm from './ProfileForm';
import { Button } from '@mui/material';

interface ProviderData {
  id: string;
  name: string;
  specialty: string;
  email: string;
}

const ProviderProfileManagement: React.FC = () => {
  const [providerData, setProviderData] = React.useState<ProviderData | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = (data: ProviderData) => {
    setProviderData(data);
    setIsEditing(false);
  };
  const handleCancel = () => setIsEditing(false);

  return (
    <div>
      {!isEditing ? (
        <>
          <ProfileDetails provider={providerData} />
          <Button variant="contained" onClick={handleEdit}>Edit Profile</Button>
        </>
      ) : (
        <ProfileForm
          initialData={providerData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProviderProfileManagement;