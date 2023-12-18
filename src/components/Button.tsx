import Spinner from "./Spinner";

type ButtonProps = {
  text: string;
  loader?: boolean;
};

const Button: React.FC<ButtonProps> = ({ text, loader }) => {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto default-button flex items-center justify-center"
    >
      {text}
      &nbsp;
      {loader && <Spinner />}
    </button>
  );
};

export default Button;
