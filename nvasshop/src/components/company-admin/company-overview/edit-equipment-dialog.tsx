import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Equipment } from '../../../model/company';
import { updateEquipment } from '../../../service/https/equipment-service';

interface EditEquipmentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (editedEquipment: Equipment) => void;
  equipment: Equipment; // Assuming Equipment is your data type
}

function EditEquipmentDialog({
  open,
  onClose,
  onSave,
  equipment,
}: EditEquipmentDialogProps) {
  const [editedEquipment, setEditedEquipment] = useState<Equipment>(equipment!);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEquipment((prevEquipment) => ({
      ...prevEquipment,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try{
        await updateEquipment(editedEquipment);
    }catch(error){
        console.error('Error updating pickup schedule: ', error);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Equipment</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={editedEquipment.name}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={editedEquipment.description}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={editedEquipment.quantity}
          onChange={handleInputChange}
          required
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEquipmentDialog;
