import { useState } from 'react';

interface FormInputProps {
    initialValue: string;
    validate: (value: string) => boolean;
}

const useFormInput = ({ initialValue, validate }: FormInputProps) => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        setIsValid(validate(newValue));
    };

    return {
        value,
        isValid,
        onChange: handleChange,
    };
};

export default useFormInput;
