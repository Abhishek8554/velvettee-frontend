import { CircularProgress } from "@mui/material";

type SpinnerProps = object;

const Spinner: React.FC<SpinnerProps> = () => {
  return <CircularProgress size={18} color="secondary" />;
};

export default Spinner;
