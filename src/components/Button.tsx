/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from './Spinner';

export enum ButtonTypes {
    OUTLINE = 'OUTLINE',
}

type ButtonProps = {
    text: string;
    loader?: boolean;
    type?: ButtonTypes;
    className?: string;
    Icon?: any;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
    text,
    loader,
    type,
    className,
    Icon,
    onClick,
}) => {
    if (!type) {
        return (
            <button
                onClick={() => (onClick ? onClick() : '')}
                type="submit"
                className={`bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto default-button flex items-center justify-center ${className}`}
            >
                {Icon && (
                    <span className="h-5 button-icon-container mr-1 flex">
                        <Icon />
                    </span>
                )}{' '}
                {text}
                &nbsp;
                {loader && <Spinner />}
            </button>
        );
    }
    if (type === ButtonTypes.OUTLINE) {
        return (
            <button
                onClick={() => (onClick ? onClick() : '')}
                type="submit"
                className={`border-2 font-medium border-current p-2 rounded-md w-full sm:w-auto outline-button flex items-center justify-center color-primary ${className}`}
            >
                {Icon && (
                    <span className="h-5 button-icon-container mr-1 flex">
                        <Icon />
                    </span>
                )}{' '}
                {text}
                &nbsp;
                {loader && <Spinner />}
            </button>
        );
    }
};

export default Button;
