import * as React from 'react';
import autobind from 'autobind-decorator';
import { Store } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { ActionForm } from './ActionForm';
import { config } from '../config';
import { IReduxServiceList, IReduxServiceDemoParams, IReduxServiceDemoStore } from '../types';
import { StateMonitor } from './StateMonitor';

export interface IReduxServiceDemoProps {
  services: IReduxServiceList;
  params: IReduxServiceDemoParams;
  store: Store<IReduxServiceDemoStore>;
}

export interface IReduxServiceDemoState {
  activeService: string;
  activeAction: string;
  stateString: string;
}

export const stateToString = (state: any) => JSON.stringify(state, null, 2);

export class ReduxServiceDemo extends React.Component <IReduxServiceDemoProps, IReduxServiceDemoState> {
  componentWillMount() {
    const { params, services, store } = this.props ;
    const allServices = Object.keys(services);
    const { action, service } = params;
    const activeService = service || allServices[0];
    const activeAction = action || Object.keys(services[activeService].types)[0];
    const stateString = stateToString(store.getState());
    this.setState({ activeService, activeAction, stateString });
    store.subscribe(() => this.setState({ stateString: stateToString(store.getState()) }));
  }

  @autobind
  public handleActionSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    this.setState({ activeAction: value });
  }

  @autobind
  public handleServiceSelect(event: React.MouseEvent<HTMLAnchorElement>, activeService: string) {
    const { services } = this.props;
    const activeAction = Object.keys(services[activeService].types)[0];
    this.setState({ activeService, activeAction });
  }

  private renderServiceTabs() {
    const { services } = this.props;
    const serviceNames = Object.keys(services);
    return serviceNames.map((item: string) => (
      <Tab
        value={item}
        key={item}
        label={item}/>
      ),
    );
  }

  render() {
    const { services, params, store } = this.props;
    const { activeService, activeAction, stateString } = this.state;
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h4" color="inherit">{config.title}</Typography>
          </Toolbar>
          <Tabs centered={true} value={activeService} onChange={this.handleServiceSelect}>
            { this.renderServiceTabs() }
          </Tabs>
        </AppBar>
        <ActionForm
          activeAction={activeAction}
          activeService={activeService}
          handleActionSelect={this.handleActionSelect}
          services={services}
          store={store}
          params={params}
        />
        <StateMonitor stateString={stateString}/>
      </div>
    );
  }
}
