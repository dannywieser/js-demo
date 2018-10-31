import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { fieldValueForDisplay } from '../utilities';

export interface IActionFormFieldaProps {
  formFields: string[];
  formValues: { [formKey: string]: string };
  handleFieldUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ActionFormFields = ({ formFields, formValues, handleFieldUpdate }: IActionFormFieldaProps) => {
  return (
    <div>
    { formFields.map((field: string) => (
      <TextField
        key={field}
        id={field}
        margin="dense"
        value={fieldValueForDisplay(formValues[field])}
        placeholder={field}
        onChange={handleFieldUpdate}
        variant="outlined"
        fullWidth={true}
      />
    )) }
    </div>
  );
};
