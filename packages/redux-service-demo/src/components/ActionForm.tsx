import * as React from 'react';
import loglevel from 'loglevel';
import { Store } from 'redux';
import autobind from 'autobind-decorator';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import { getActiveActionForm, getDefaultFormValues, parseFieldValue } from '../utilities';
import { ActionFormFields } from './ActionFormFields';
import { IReduxServiceList, IReduxServiceDemoParams } from '../types';
import { styles } from './ReduxServiceDemo.styles';

export interface IActionFormProps extends StyledComponentProps {
  activeService: string;
  activeAction: string;
  services: IReduxServiceList;
  params: IReduxServiceDemoParams;
  store: Store<any>;
  handleActionSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IActionFormState {
  formFields: string[];
  formValues: { [formKey: string]: string };
}

export class ActionFormBase extends React.Component <IActionFormProps, IActionFormState> {
  componentWillMount() {
    const { services, activeService, activeAction, params } = this.props;
    const formFields = getActiveActionForm(services, activeService, activeAction);
    const formValues = getDefaultFormValues(formFields, params);
    this.setState({ formFields, formValues });
  }

  componentWillReceiveProps({ services, activeService, activeAction, params }: IActionFormProps) {
    const formFields = getActiveActionForm(services, activeService, activeAction);
    const formValues = getDefaultFormValues(formFields, params);
    this.setState({ formFields, formValues });
  }

  @autobind
  public handleFieldUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    const { formValues = {} } = this.state || {};
    const { id, value } = event.target;
    const updatedFormValues = { ...formValues, [id]: parseFieldValue(value) };
    this.setState({ formValues: updatedFormValues });
  }

  @autobind
  public handleSubmit() {
    const { services, activeService, activeAction, store } = this.props;
    const { formFields, formValues } = this.state;
    const service = services[activeService];
    const actionDispatch = service.actions[activeAction];
    const params = Object.values(formValues);

    loglevel.info(`handleSubmit|${activeService}|${activeAction}|`, formValues);
    store.dispatch(actionDispatch(...params));

    const resetFormValues = getDefaultFormValues(formFields);
    this.setState({ formValues: resetFormValues });
  }

  render() {
    const { activeAction, activeService, services, handleActionSelect, classes } = this.props;
    const allActions = Object.keys(services[activeService].types);
    const formFields = getActiveActionForm(services, activeService, activeAction);
    const { formValues = {} } = this.state || {};

    return (
      <Paper square className={classes.root}>
        <FormControl color="default" margin="dense" fullWidth={true}>
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
            className={classes.dispatchButton}
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

export const ActionForm = withStyles(styles)(ActionFormBase);
