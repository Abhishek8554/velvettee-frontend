import { CircularProgress } from '@mui/material';

type SpinnerProps = object;

const Spinner: React.FC<SpinnerProps> = () => {
    return <CircularProgress size={15} style={{ color: 'currentcolor' }} />;
};

export default Spinner;
