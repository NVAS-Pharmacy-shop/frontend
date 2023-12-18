import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { deleteEquipment, getEquipment } from "../../../service/https/equipment-service";
import EditEquipmentDialog from "./edit-equipment-dialog";
import { Equipment } from "../../../model/company";
import AddEquipmentDialog from "./add-equipment-dialog";

export interface EquipmentAdminProps {
  companyId: number;
}

function EquipmentAdmin(props: EquipmentAdminProps) {
  const [companyEquipmentAll, setCompanyEquipmentAll] = useState<Equipment[]>([]);
  const [companyEquipment, setCompanyEquipment] = useState<Equipment[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState<number | null>(null);
  const [addEquipmentDialogOpen, setAddEquipmentDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEquipmentData = async () => {
    try {
      const equipmentData = await getEquipment();
      setCompanyEquipment(equipmentData);
      setCompanyEquipmentAll(equipmentData);

    } catch (error) {
      console.error("Error fetching equipment data", error);
    }
  };

  useEffect(() => {
    if (props.companyId != undefined) {
      fetchEquipmentData();
    }
  }, [props.companyId]);

  const handleEditClick = (index: number) => {
    setEditDialogOpen(index);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(null);
  };

  useEffect(() => {
    if (editDialogOpen === null && props.companyId != undefined) {
      fetchEquipmentData();
    }
  }, [editDialogOpen, addEquipmentDialogOpen, props.companyId]);

  useEffect(() => {
    const filteredEquipment = companyEquipmentAll.filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCompanyEquipment(filteredEquipment);
  }, [searchQuery])

  const handleEditSave = async (editedEquipment: Equipment) => {
    handleEditDialogClose();
  };

  const handleAddEquipment = () => {
    setAddEquipmentDialogOpen(true);
  }
  
  const handleAddEquipmentDialogClose = () => {
    setAddEquipmentDialogOpen(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRemoveEquipment = async (id : number) => {
    try{
      await deleteEquipment(id);
      fetchEquipmentData();
    }catch (error) {
      console.error("Error deleting equipment ", error);
    }
  }

  if (!companyEquipment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className = "equipment-header">
        <h2>Equipment</h2>
        <Button
          className="add-equipment"
          type="button"
          variant="contained"
          color="primary"
          onClick={handleAddEquipment}
        >Add</Button>
        <AddEquipmentDialog open={addEquipmentDialogOpen} onClose={handleAddEquipmentDialogClose}/>
      </div>
      <TextField
          fullWidth
          label="Search"
          name="search-box"
          value={searchQuery}
          onChange={handleInputChange}
          required
          margin="normal"
        />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200, maxWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyEquipment.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(index)}
                  variant="contained">Edit</Button>
                  {editDialogOpen === index && (
                    <EditEquipmentDialog
                      open={true}
                      onClose={handleEditDialogClose}
                      onSave={handleEditSave}
                      equipment={row || { name: "", description: "", quantity: 0 }}/>)}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => {
                        const shouldDelete = window.confirm("Are you sure you want to remove this equipment?");

                        if (shouldDelete) {
                            handleRemoveEquipment(row.id);
                        }
                    }}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EquipmentAdmin;
