/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from './Spinner';

export enum ButtonTypes {
    OUTLINE = 'OUTLINE',
    TEXT = 'TEXT',
}

type ButtonProps = {
    text: string;
    loader?: boolean;
    type?: ButtonTypes | null;
    className?: string;
    PrefixIcon?: any;
    prefixImgePath?: string;
    disabled?: boolean;
    preventDefault?: boolean;
    stopPropogation?: boolean;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
    text,
    loader,
    type,
    className,
    PrefixIcon,
    prefixImgePath,
    stopPropogation,
    preventDefault,
    disabled,
    onClick,
}) => {
    if (!type) {
        return (
            <button
                onClick={(e: any) => {
                    if (stopPropogation) {
                        e.stopPropagation();
                    }
                    if (preventDefault) {
                        e.preventDefault();
                    }
                    if (onClick) {
                        onClick();
                    }
                }}
                disabled={disabled}
                type="submit"
                className={`bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto default-button flex items-center justify-center ${className} ${
                    disabled ? 'disabled-btn' : ''
                }`}
            >
                {PrefixIcon && (
                    <span className="h-5 button-icon-container mr-1 flex">
                        <PrefixIcon />
                    </span>
                )}{' '}
                {prefixImgePath && (
                    <span className="h-5 button-icon-container mr-1 flex">
                        <img src={prefixImgePath} />
                    </span>
                )}
                <span>{text}</span>
                &nbsp;
                {loader && <Spinner />}
            </button>
        );
    }
    if (type === ButtonTypes.OUTLINE) {
        return (
            <button
                onClick={(e: any) => {
                    if (stopPropogation) {
                        e.stopPropagation();
                    }
                    if (preventDefault) {
                        e.preventDefault();
                    }
                    if (onClick) {
                        onClick();
                    }
                }}
                type="submit"
                disabled={disabled}
                className={`border-2 font-medium border-current p-2 rounded-md w-full sm:w-auto outline-button flex items-center justify-center color-primary ${className} ${
                    disabled ? 'disabled-btn' : ''
                }`}
            >
                {PrefixIcon && (
                    <span className="h-5 button-icon-container mr-1 flex">
                        <PrefixIcon />
                    </span>
                )}{' '}
                {prefixImgePath && (
                    <span className="h-5 button-icon-container mr-1 flex">
                        <img src={prefixImgePath} />
                    </span>
                )}
                <span>{text}</span>
                &nbsp;
                {loader && <Spinner />}
            </button>
        );
    }
    if (type === ButtonTypes.TEXT) {
        return (
            <button
                onClick={(e: any) => {
                    if (stopPropogation) {
                        e.stopPropagation();
                    }
                    if (preventDefault) {
                        e.preventDefault();
                    }
                    if (onClick) {
                        onClick();
                    }
                }}
                type="submit"
                disabled={disabled}
                className={` font-medium border-current p-2 rounded-md w-full sm:w-auto outline-button flex items-center justify-center color-primary ${className} ${
                    disabled ? 'disabled-btn' : ''
                }`}
            >
                {PrefixIcon && (
                    <span className="h-5 button-icon-container mr-1 flex">
                        <PrefixIcon />
                    </span>
                )}{' '}
                {prefixImgePath && (
                    <span className="h-5 button-icon-container mr-1 flex">
                        <img src={prefixImgePath} />
                    </span>
                )}
                <span>{text}</span>
                &nbsp;
                {loader && <Spinner />}
            </button>
        );
    }
};

export default Button;
