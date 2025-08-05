import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';

interface ZodErrorsProps {
    error?: string[];
}

const ZodErrors: React.FC<ZodErrorsProps> = ({ error }) => {
    if (!error) return null;

    return error.map((err: string, index: number) => (
        <FormHelperText key={index} className="form-error-text">
            {err}
        </FormHelperText>
    ));
};

export default ZodErrors;
