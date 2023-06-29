import { useState } from 'react';

const useInput = (initialValue, validation) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setValue(e.target.value);
        validate(e.target.value);
    };

    const validate = (inputValue) => {
        if (validation && !validation(inputValue)) {
            setError(true);
        } else {
            setError(false);
        }
    };

    return { value, onChange: handleChange, error };
};

export default useInput;