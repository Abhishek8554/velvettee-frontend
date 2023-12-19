import { create } from 'zustand';
import { SnackBarTypes } from '../enums/SnackBarTypes';

interface ISnackBarData {
    message: string;
    type: SnackBarTypes;
    isOpen: boolean;
    open: (message: string, type?: SnackBarTypes) => void;
    close: () => void;
}

const useSnackBar = create<ISnackBarData>()((set) => ({
    isOpen: false,
    message: '',
    type: SnackBarTypes.SUCCESS,
    open: (message: string, type?: SnackBarTypes) =>
        set(() => ({ isOpen: true, message, type })),
    close: () => set(() => ({ isOpen: false, message: '' })),
}));

export default useSnackBar;
