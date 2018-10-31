import * as React from 'react';
import * as log from 'loglevel';
import { Store } from 'redux';
import autobind from 'autobind-decorator';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getActiveActionForm, getDefaultFormValues } from '../utilities';
import { ActionFormFields } from './ActionFormFields';
import { parseFieldValue } from '../utilities';
import { IReduxServiceList, IReduxServiceDemoParams, IReduxServiceDemoStore } from '../types';
import * as styles from './ReduxServiceDemo.styles';

export interface IActionFormProps {
  activeService: string;
  activeAction: string;
  services: IReduxServiceList;
  params: IReduxServiceDemoParams;
  store: Store<IReduxServiceDemoStore>;
  handleActionSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IActionFormState {
  formFields: string[];
  formValues: { [formKey: string]: string };
}

export class ActionForm extends React.Component <IActionFormProps, IActionFormState> {
  componentWillReceiveProps({ services, activeService, activeAction, params }: IActionFormProps) {
    const formFields = getActiveActionForm(services, activeService, activeAction);
    const formValues = getDefaultFormValues(formFields, params);
    this.setState({ formFields, formValues });
  }

  @autobind
  public handleFieldUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    const { formValues } = this.state;
    const { id, value } = event.target;
    const updatedFormValues = { ...formValues, [id]: parseFieldValue(value) };
    this.setState({ formValues: updatedFormValues });
  }

  @autobind
  handleSubmit() {
    const { services, activeService, activeAction, store } = this.props;
    const { formFields, formValues } = this.state;
    const service = services[activeService];
    const actionDispatch = service.actions[activeAction];
    const params = Object.values(formValues);
    log.info(`handleSubmit|${activeService}|${activeAction}|`, formValues);
    store.dispatch(actionDispatch(...params));

    const resetFormValues = getDefaultFormValues(formFields);
    this.setState({ formValues: resetFormValues });
  }

  render() {
    const { activeAction, activeService, services, handleActionSelect } = this.props;
    const allActions = Object.keys(services[activeService].types);
    const formFields = getActiveActionForm(services, activeService, activeAction);
    const { formValues = {} } = this.state || {};

    return (
      <Paper square className={styles.actionForm}>
        <FormControl color="default" margin="none" fullWidth={true}>
          <Select
            value={activeAction}
            onChange={handleActionSelect}>
            { allActions.map((action: string) => (<MenuItem key={action} value={action}>{action}</MenuItem>))}
          </Select>
          <ActionFormFields
            formFields={formFields}
            formValues={formValues}
            handleFieldUpdate={this.handleFieldUpdate}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}>
            dispatch
          </Button>
        </FormControl>
      </Paper>
    );
  }
}
