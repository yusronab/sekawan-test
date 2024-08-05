export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'HIGH':
            return 'error';
        case 'NORMAL':
            return 'success';
        case 'LOW':
            return 'warning';
        default:
            return 'default';
    }
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'HIGH':
            return 'error';
        case 'NEW':
            return 'success';
        case 'URGENT':
            return 'warning';
        default:
            return 'default';
    }
};