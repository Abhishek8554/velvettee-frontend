import { Snackbar as SnackbarComponent, SnackbarContent } from '@mui/material';
import useSnackBar from '../../stores/Snackbar';
import { SnackBarTypes } from '../../enums/SnackBarTypes';
const Snackbar = () => {
    const snackBarService = useSnackBar();
    return (
        <SnackbarComponent
            open={snackBarService.isOpen}
            onClose={() => {
                snackBarService.close();
            }}
            className={snackBarService.type}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <SnackbarContent
                style={{
                    backgroundColor:
                        snackBarService.type === SnackBarTypes.DANGER
                            ? 'var(--danger-color)'
                            : snackBarService.type === SnackBarTypes.INFO
                            ? 'var(--info-color)'
                            : snackBarService.type === SnackBarTypes.WARNING
                            ? 'var(--warning-color)'
                            : 'var(--success-color)',
                }}
                message={
                    <span className="font-medium">
                        {snackBarService.message}
                    </span>
                }
            />
        </SnackbarComponent>
    );
};

export default Snackbar;
