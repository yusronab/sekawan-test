import { Dialog, DialogContent, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

const ITEM_HEIGHT = 48;

const MenuTicket = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [dialogOpen, setDialogOpen] = useState({ approve: false, reject: false });

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openDialogHandler = (type) => {
        setDialogOpen({ ...dialogOpen, [type]: true });
        handleClose();
    };

    const closeDialogHandler = (type) => {
        setDialogOpen({ ...dialogOpen, [type]: false });
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <SlOptionsVertical className="text-color-primary" />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }
                }}
            >
                <MenuItem onClick={() => openDialogHandler('approve')}>
                    Approve
                </MenuItem>
                <MenuItem onClick={() => openDialogHandler('reject')}>
                    Reject
                </MenuItem>
            </Menu>
            <Dialog
                open={dialogOpen.approve}
                keepMounted
                maxWidth={'sm'}
                fullWidth
                onClose={() => closeDialogHandler('approve')}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Approve Ticket</DialogTitle>
                <DialogContent className="flex flex-col">
                    <div>Approve this Ticket request?</div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={dialogOpen.reject}
                keepMounted
                maxWidth={'sm'}
                fullWidth
                onClose={() => closeDialogHandler('reject')}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Reject Ticket</DialogTitle>
                <DialogContent className="flex flex-col">
                    <div>This rejection may impact your plans as the product may not be available anymore.</div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MenuTicket;
