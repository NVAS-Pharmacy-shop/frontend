import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ReservationService, ReservationInfo } from '../../../../service/https/reservation-service';

interface UploadImageDialogProps {
    open: boolean;
    onClose: () => void;
}

function UploadImageDialog({ open, onClose }: UploadImageDialogProps) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [reservationInfo, setReservationInfo] = useState<ReservationInfo | null>(null); // Add a state variable for the reservation info

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedImage(file || null);
        if (file) {
            setImagePreviewUrl(URL.createObjectURL(file));
            try {
                const info = await ReservationService.getReservationInfo(file); // Call the method when an image is uploaded
                setReservationInfo(info); // Set the reservation info
            } catch (error) {
                console.error('Error getting reservation info: ', error);
            }
        } else {
            setImagePreviewUrl(null);
            setReservationInfo(null);
        }
    };

    const handleClose = () => {
        setSelectedImage(null);
        setImagePreviewUrl(null);
        setReservationInfo(null);
        onClose();
    };

    const handleSubmit = async () => {
        if (selectedImage) {
            try {
                await ReservationService.pickupReservationQRCode(selectedImage);
            } catch (error) {
                console.error('Error delivering reservation: ', error);
            }
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogContent>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{maxWidth: '500px', maxHeight: '500px'}} />}
                {reservationInfo && ( // Only display the reservation info if it exists
                    <>
                        <p>User Email: {reservationInfo.user_email}</p>
                        <p>Date: {reservationInfo.date}</p>
                        <p>Start Time: {reservationInfo.start_time}</p>
                        <p>Reserved Equipment:</p>
                        <ul>
                            {reservationInfo.reserved_equipment.map((equipment, index) => (
                                <li key={index}>
                                    {equipment.equipment} x {equipment.quantity}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={!selectedImage}>
                    Mark as delivered
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UploadImageDialog;