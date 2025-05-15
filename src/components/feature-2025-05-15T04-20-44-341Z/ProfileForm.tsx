import React from 'react';
import { ProviderData } from './ProviderProfileManagement';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface ProfileFormProps {
  initialData: ProviderData | null;
  onSave: (data: ProviderData) => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = React.useState(initialData?.name || '');
  const [specialty, setSpecialty] = React.useState(initialData?.specialty || '');
  const [email, setEmail] = React.useState(initialData?.email || '');

  const handleSave = () => {
    onSave({
      id: initialData?.id || 'new',
      name,
      specialty,
      email
    });
  };

  return (
    <Dialog open={true} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Provider Profile</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Specialty"
          type="text"
          fullWidth
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileForm;