import * as React from 'react';
import { fieldValueForDisplay } from '../utilities';
import { IReduxServiceDemoParams, IReduxServiceList } from '../types';

export function getDefaultFormValues(fieldNames: string[], params?: IReduxServiceDemoParams) {
  if (!fieldNames) {
    return {};
  }
  const formValueReducer = (valueObj: any, fieldName: string) => {
    const fieldValue = params && params[fieldName] ? params[fieldName] : '';
    return { ...valueObj, [fieldName]: fieldValue };
  };
  return fieldNames.reduce(formValueReducer, {});
}

export function getActiveActionForm(services: IReduxServiceList, activeService: string, activeAction: string) {
  const forms = activeService && activeAction ? services[activeService].forms[activeAction] : [];
  return forms || [];
}

export function formInput(fieldName: string, fieldValue: string,
    handleFieldUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void) {
  const displayFieldValue = fieldValueForDisplay(fieldValue);
  return (
    <div className="field" key={fieldName}>
      <div className="control">
        <input
          className="input is-medium"
          id={fieldName}
          type="text"
          value={displayFieldValue}
          placeholder={fieldName}
          onChange={handleFieldUpdate}
        />
      </div>
    </div>
  );
}

export interface IActionSubmitButtonProps {
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export function ActionSubmitButton({ handleSubmit }: IActionSubmitButtonProps) {
  return (
    <button
      onClick={handleSubmit}
      className="button is-primary is-medium is-fullwidth"
      type="button"
    >
      dispatch
    </button>
  );
}
