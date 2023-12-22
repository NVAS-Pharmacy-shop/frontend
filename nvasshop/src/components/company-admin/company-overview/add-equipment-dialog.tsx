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
import { addEquipment, updateEquipment } from '../../../service/https/equipment-service';

interface AddEquipmentDialogProps {
  open: boolean;
  onClose: () => void;
}

function AddEquipmentDialog({
  open,
  onClose,
}: AddEquipmentDialogProps) {
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    description: '',
    quantity: 0,
    type: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEquipment((prevEquipment) => ({
      ...prevEquipment,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try{
        const equipment : Equipment = {
            id: -1,
            name: newEquipment.name,
            description: newEquipment.description,
            type: newEquipment.type,
            quantity: newEquipment.quantity
        }
        await addEquipment(equipment);
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
          value={newEquipment.name}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={newEquipment.description}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={newEquipment.quantity}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Type"
          name="type"
          type="number"
          value={newEquipment.type}
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

export default AddEquipmentDialog;
