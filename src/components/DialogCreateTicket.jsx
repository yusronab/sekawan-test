import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { useState } from 'react'

const DialogCreateTicket = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setDescription('')
        setPriority('')
    };

    return (
        <>
            <button onClick={() => setDialogOpen(true)} className="bg-color-primary hover:bg-color-primaryHover py-2 px-3 rounded-md font-semibold text-sm text-blue-600">
                Add Ticket
            </button>
            <Dialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                maxWidth={"sm"}
                fullWidth
                keepMounted
            >
                <DialogTitle sx={{ fontWeight: 700 }}>New Ticket Form</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Ticket Details</InputLabel>
                            <OutlinedInput
                                type="text"
                                label="Ticket Details"
                                name="detail"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priority}
                                label="Priority"
                                onChange={handlePriorityChange}
                            >
                                <MenuItem value={"LOW"}>Low</MenuItem>
                                <MenuItem value={"NORMAL"}>Normal</MenuItem>
                                <MenuItem value={"HIGH"}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <DialogActions className="!p-0 mt-12">
                            <button onClick={handleCloseDialog} className="text-blue-600 py-2 px-3 font-bold text-base">Cancel</button>
                            <button
                                className={`text-white py-2 px-3 flex justify-center items-center rounded-md font-bold text-base ${isLoading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? <span className="flex items-center gap-2">Loading <CircularProgress color='inherit' size={20} thickness={6} /></span>
                                    : 'Create Ticket'}
                            </button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogCreateTicket