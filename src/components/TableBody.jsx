import { Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MenuTicket from './MenuTicket'
import { getPriorityColor } from '../constant/func'

dayjs.extend(relativeTime)

const TableBody = ({ displayedData }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleRowClick = (ticket) => {
        setSelectedTicket(ticket);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedTicket(null);
        setDialogOpen(false);
    };

    return (
        <>
            <tbody className="border-b">
                {displayedData.map((ticket, i) => (
                    <tr key={i} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(ticket)}>
                        <td className="p-4">
                            <div className="flex gap-4 items-center">
                                <Avatar src={ticket.picture} alt={ticket.customer} />
                                <div>
                                    <p>{ticket.message}</p>
                                    <p className="text-sm text-gray-400">Updated {dayjs(ticket.updated).fromNow()}</p>
                                </div>
                            </div>
                        </td>
                        <td className="p-4">
                            <div>{ticket.customer}</div>
                            <div className="text-gray-400 text-sm">on {dayjs(ticket.created).format('DD-MM-YYYY')}</div>
                        </td>
                        <td className="p-4">
                            <div>{dayjs(ticket.created).format('MMM DD, YYYY')}</div>
                            <div className="text-gray-400 text-sm">{dayjs(ticket.created).format('hh:mm')}</div>
                        </td>
                        <td className="p-4">
                            <Chip
                                label={ticket.priority}
                                color={getPriorityColor(ticket.priority)}
                            />
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                            <MenuTicket />
                        </td>
                    </tr>
                ))}
            </tbody>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Ticket Details</DialogTitle>
                <DialogContent>
                    {selectedTicket && (
                        <div>
                            <p><strong>Message:</strong> {selectedTicket.message}</p>
                            <p><strong>Customer:</strong> {selectedTicket.customer}</p>
                            <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                            <p><strong>Created:</strong> {dayjs(selectedTicket.created).format('MMM DD, YYYY hh:mm')}</p>
                            <p><strong>Updated:</strong> {dayjs(selectedTicket.updated).fromNow()}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default TableBody