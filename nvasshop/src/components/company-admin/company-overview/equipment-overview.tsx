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
} from "@mui/material";
import { getEquipment } from "../../../service/https/equipment-service";
import EditEquipmentDialog from "./edit-equipment-dialog";
import { Equipment } from "../../../model/company";

interface Company {
  id: number;
  name: string;
  address: string;
  description: string;
  email: string;
  website: string;
  rate: number;
  equipment: Equipment[];
}

export interface EquipmentAdminProps {
  companyId: number;
}

function EquipmentAdmin(props: EquipmentAdminProps) {
  const [companyEquipment, setCompanyEquipment] = useState<Equipment[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState<number | null>(null);

  const fetchEquipmentData = async () => {
    try {
      const equipmentData = await getEquipment(props.companyId);
      setCompanyEquipment(equipmentData);
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
  }, [editDialogOpen, props.companyId]);


  const handleEditSave = async (editedEquipment: Equipment) => {
    handleEditDialogClose();
  };

  if (!companyEquipment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
                  {/* Button to open edit dialog */}
                  <Button onClick={() => handleEditClick(index)}>Edit</Button>
                  {editDialogOpen === index && (
                    <EditEquipmentDialog
                      open={true}
                      onClose={handleEditDialogClose}
                      onSave={handleEditSave}
                      equipment={row || { name: "", description: "", quantity: 0 }} // Pass default values if selectedEquipment is null
                    />
                  )}
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
