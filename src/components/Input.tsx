interface InputProps {
    reference: any;
    placeholder: string;
    type?: string;
}

export function Input({reference, placeholder, type}: InputProps) {
    return <div>
        <input type={type || "text"} placeholder={placeholder} ref={reference} className="px-4 py-2 border rounded m-2"/>
    </div>
}