import { ReactElement } from "react";

export interface ButtonProps {
    varinat: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-400"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center gap-2";

export function Button({varinat, text, startIcon, endIcon, onClick, fullWidth, loading}: ButtonProps) {
    return <button className={`${variantClasses[varinat]} ${defaultStyles} ${fullWidth? "w-full flex justify-center": ""} ${loading? "opacity-45 cursor-not-allowed": ""}`} onClick={onClick} disabled={loading}>{startIcon} {text} {endIcon}</button>
}