import * as React from 'react';
import * as log from 'loglevel';
import autobind from 'autobind-decorator';
import * as components from './ActionForm.components';
import { parseFieldValue } from '../utilities';
import { IReduxServiceList, IReduxServiceDemoParams } from '../types';

export interface IActionFormProps {
  activeService: string;
  activeAction: string;
  services: IReduxServiceList;
  params: IReduxServiceDemoParams;
}

export interface IActionFormState {
  formFields: string[];
  formValues: { [formKey: string]: string };
}

export class ActionForm extends React.Component <IActionFormProps, IActionFormState> {
  componentWillMount() {
    const { services, activeService, activeAction, params } = this.props;
    const formFields = components.getActiveActionForm(services, activeService, activeAction);
    const formValues = components.getDefaultFormValues(formFields, params);
    this.setState({ formFields, formValues });
  }

  @autobind
  public handleFieldUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    const { formValues } = this.state;
    const fieldValue = parseFieldValue(event.target.value);
    const updatedFormValues = {
      ...formValues,
      [event.target.id]: fieldValue,
    };
    this.setState({ formValues: updatedFormValues });
  }

  handleSubmit() {
    const {
      services,
      activeService,
      activeAction,
    } = this.props;
    const { formFields, formValues } = this.state;
    const service = services[activeService];
    const actionDispatch = service.actions[activeAction];
    const params = Object.values(formValues);
    log.info(`handleSubmit|${activeService}|${activeAction}|`, formValues);
  //  store.dispatch(actionDispatch(...params));
    const resetFormValues = components.getDefaultFormValues(formFields);
    this.setState({ formValues: resetFormValues });
  }

  render() {
    const { formFields, formValues } = this.state;
    return (
      <div>
        {formFields.map((field: string) => components.formInput(field, formValues[field], this.handleFieldUpdate))}
        <components.ActionSubmitButton handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
