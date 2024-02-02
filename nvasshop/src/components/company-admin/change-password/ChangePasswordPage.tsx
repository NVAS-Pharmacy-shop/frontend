import { useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { changeAdminPassword } from "../../../service/https/company-admin-service";
import "./change-password.css";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ChangeCompanyAdminPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const navigate = useNavigate();
    
    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPasswordConfirmation(event.target.value);
    };
    
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    
    const handleSubmit = async (event: React.FormEvent) => {
        event?.preventDefault();
        try{
            if(newPassword === newPasswordConfirmation){
                await changeAdminPassword(newPassword);
                alert("Password changed successfully");
                navigate("/");
            }else{
                setErrorMessage('Passwords do not match');
            }
        }catch(error){
            console.error('Error updating password: ', error);
        }
    }

    return(
        <div className = "change-password-div">
            <form className="form-class" onSubmit={handleSubmit}>
            <TextField
                name="newPassword"
                label="New password"
                variant="standard"
                value={newPassword}
                onChange={handleNewPasswordChange}
                type={showPassword ? 'text' : 'password'}
                required
                InputProps={{
                    endAdornment: (
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                    ),
                }}
                />
                <TextField 
                name="newPasswordConfirmation" 
                label="Confirmation"  
                variant="standard" 
                value={newPasswordConfirmation} 
                onChange={handleConfirmationChange}
                required
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPasswordConfirmation ? <VisibilityOffIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    ),
                  }}
                />
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <Button variant="contained" type="submit" className="button-submit">Submit</Button>
            </form>
        </div>
    );
}