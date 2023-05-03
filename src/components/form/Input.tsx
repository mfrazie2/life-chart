import React, { useCallback } from "react";

interface InputProps {
    maxValue?: string | number;
    onChange: (x: Date) => void; 
}
/**
 * This is only a DATE input field 
 */
const Input = ({maxValue, onChange}: InputProps) => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replaceAll('-', '/');
        if (value) {
            onChange(new Date(value));
        }
    }, []);

    return (
        <input
            className="form-input"
            type="date"
            max={maxValue}
            onChange={handleChange}
        />
    );
}

export default Input;