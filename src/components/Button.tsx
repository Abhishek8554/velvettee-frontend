type ButtonProps = {
  text: string;
};

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto default-button"
    >
      {text}
    </button>
  );
};

export default Button;
