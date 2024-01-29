import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

interface UploadImageDialogProps {
    open: boolean;
    onClose: () => void;
}

function UploadImageDialog({ open, onClose }: UploadImageDialogProps) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedImage(file || null);
    };

    const handleSubmit = () => {
        if (selectedImage) {
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogContent>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={!selectedImage}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UploadImageDialog;
