import Spinner from './Spinner';

export enum ButtonTypes {
    OUTLINE = 'OUTLINE',
}

type ButtonProps = {
    text: string;
    loader?: boolean;
    type?: ButtonTypes;
};

const Button: React.FC<ButtonProps> = ({ text, loader, type }) => {
    if (!type) {
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
    }
    if (type === ButtonTypes.OUTLINE) {
        return (
            <button
                type="submit"
                className="border-2 font-medium border-current p-2 rounded-md w-full sm:w-auto outline-button flex items-center justify-center color-primary"
            >
                {text}
                &nbsp;
                {loader && <Spinner />}
            </button>
        );
    }
};

export default Button;
