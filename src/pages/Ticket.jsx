import React, { useState } from 'react'
import { useTheme } from '../context/useThemeContext'
import { data } from '../constant/data'
import { Menu, MenuItem, TablePagination } from '@mui/material'
import { FaFilter, FaSortAmountUp } from "react-icons/fa"
import TableBody from '../components/TableBody'
import { useTranslation } from 'react-i18next'
import DialogCreateTicket from '../components/DialogCreateTicket'

const Ticket = () => {
    const { theme } = useTheme()
    const { t } = useTranslation()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const [sortAnchorEl, setSortAnchorEl] = useState(null)
    const [filterAnchorEl, setFilterAnchorEl] = useState(null)
    const [sortOrder, setSortOrder] = useState('')
    const [filterPriority, setFilterPriority] = useState('')

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleSortClick = (event) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortAnchorEl(null);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        handleSortClose();
    };

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    const handleFilterChange = (priority) => {
        setFilterPriority(priority);
        handleFilterClose();
    };

    const sortData = (data) => {
        return data.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.customer.localeCompare(b.customer);
            }
            return b.customer.localeCompare(a.customer);
        });
    };

    const filterData = (data) => {
        if (!filterPriority) return data;
        return data.filter(item => item.priority === filterPriority);
    };

    const displayedData = filterData(sortData(data)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return (
        <div className={`rounded-md border ${!theme ? 'bg-white' : 'bg-darkmode'}`}>
            <div className="p-4 flex justify-between items-center">
                <div className="text-xl font-semibold">{t('ticket.header')}</div>
                <div className="flex gap-6">
                    <DialogCreateTicket />
                    <div className="my-auto">
                        <button onClick={handleSortClick} className="flex gap-2 items-center text-gray-500">
                            <FaSortAmountUp />
                            <span>{t('ticket.sort')}</span>
                        </button>
                        <Menu
                            id="sort-menu"
                            anchorEl={sortAnchorEl}
                            keepMounted
                            open={Boolean(sortAnchorEl)}
                            onClose={handleSortClose}
                        >
                            <MenuItem onClick={() => handleSortOrderChange('asc')}>{t('ticket.sort1')}</MenuItem>
                            <MenuItem onClick={() => handleSortOrderChange('desc')}>{t('ticket.sort2')}</MenuItem>
                        </Menu>
                    </div>
                    <div className="my-auto">
                        <button onClick={handleFilterClick} className="flex gap-2 items-center text-gray-500">
                            <FaFilter />
                            <span>{t('ticket.filter')}</span>
                        </button>
                        <Menu
                            id="filter-menu"
                            anchorEl={filterAnchorEl}
                            keepMounted
                            open={Boolean(filterAnchorEl)}
                            onClose={handleFilterClose}
                        >
                            <MenuItem onClick={() => handleFilterChange('HIGH')}>{t('ticket.filter1')}</MenuItem>
                            <MenuItem onClick={() => handleFilterChange('NORMAL')}>{t('ticket.filter2')}</MenuItem>
                            <MenuItem onClick={() => handleFilterChange('LOW')}>{t('ticket.filter3')}</MenuItem>
                            <MenuItem onClick={() => handleFilterChange('')}>{t('ticket.filter4')}</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <table width="100%">
                <thead>
                    <tr>
                        <td className="py-2 px-4 text-sm border-b text-gray-400 font-semibold">{t('ticket.row1')}</td>
                        <td className="py-2 px-4 text-sm border-b text-gray-400 font-semibold">{t('ticket.row2')}</td>
                        <td className="py-2 px-4 text-sm border-b text-gray-400 font-semibold">{t('ticket.row3')}</td>
                        <td className="py-2 px-4 text-sm border-b text-gray-400 font-semibold">{t('ticket.row4')}</td>
                        <td className="py-2 px-4 text-sm border-b text-gray-400 font-semibold" />
                    </tr>
                </thead>
                <TableBody displayedData={displayedData} />
            </table>
            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[8, 16, 24]}
                labelRowsPerPage={t('ticket.rpp')}
                className="flex items-center justify-end"
            />
        </div>
    )
}

export default Ticket