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
import { Contract } from "../../../model/company";
import { cancelContract, getCompanyContracts } from "../../../service/https/company-service";
import { format, set } from 'date-fns';

function ContractsOverview(){
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [activeButton, setActiveButton] = useState(false);

    const fetchContracts = async () => {
        try {
          const contractsData = await getCompanyContracts();
          setContracts(contractsData);
          console.log(contractsData);
    
        } catch (error) {
          console.error("Error fetching equipment data", error);
        }
    };
    
    useEffect(() => {
        fetchContracts();
    }, []);
    
    const handleCancel = async (contractId: number) => {
        try {
            await cancelContract(contractId);
            fetchContracts();
        }catch(error){
            console.error("Error cancelling contract", error);
        }

    };

    const checkDisabled = (contractId: number) : boolean => {
        return !(contracts.filter(contract => contract.contract_id === contractId)[0].status === "active");
    }

    return(
        <div>
            <TableContainer component={Paper}>
            <Table aria-label="contract table">
                <TableHead>
                    <TableRow>
                        <TableCell>Contract ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Equipment Name</TableCell>
                        <TableCell>Contract Quantity</TableCell>
                        <TableCell>In Stock</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contracts.map((contract) => (
                        <React.Fragment key={contract.contract_id}>
                            {contract.equipment.map((equipment, index) => (
                                <TableRow key={`${contract.contract_id}-${equipment.equipment_id}`}>
                                    {index === 0 && ( 
                                        <React.Fragment>
                                            <TableCell rowSpan={contract.equipment.length}>{contract.contract_id}</TableCell>
                                            <TableCell rowSpan={contract.equipment.length}>{format(new Date(contract.date), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                                            <TableCell rowSpan={contract.equipment.length}>{contract.status}</TableCell>
                                        </React.Fragment>
                                    )}
                                    <TableCell>{equipment.name}</TableCell>
                                    <TableCell>{equipment.contract_quantity}</TableCell>
                                    <TableCell>{equipment.quantity}</TableCell>
                                    {index === 0 && ( 
                                        <TableCell rowSpan={contract.equipment.length}>
                                            <Button variant="contained" 
                                                color="secondary" 
                                                onClick={() => handleCancel(contract.contract_id)}
                                                disabled={checkDisabled(contract.contract_id)}>
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}

export default ContractsOverview;