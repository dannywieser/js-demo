import * as React from 'react';
import autobind from 'autobind-decorator';
import { ActionForm } from './ActionForm';
import { config } from '../config';
import {
  ServiceTabs,
  ActionSelect,
  StateMonitor,
  stateToString,
} from './ReduxServiceDemo.components';
import { IReduxServiceList, IReduxServiceDemoParams } from '../types';

export interface IReduxServiceDemoProps {
  services: IReduxServiceList;
  params: IReduxServiceDemoParams
}

export interface IReduxServiceDemoState {
  activeService: string;
  activeAction: string;
  stateString: string;
}

export class ReduxServiceDemo extends React.Component <IReduxServiceDemoProps, IReduxServiceDemoState> {
  componentWillMount() {
    const { params, services } = this.props ;
    const allServices = Object.keys(services);
    const { action, service } = params;
    const activeService = service || allServices[0];
    const activeAction = action || Object.keys(services[activeService].types)[0];
    const stateString = ''; //stateToString(props.store.getState());
    this.setState({ activeService, activeAction, stateString });
  }

  @autobind
  public handleActionSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    this.setState({ activeAction: value });
  }

  @autobind
  public handleServiceSelect(event: React.MouseEvent<HTMLAnchorElement>) {
    const { id } = event.target as any;
    const { services } = this.props;
    const activeAction = Object.keys(services[id].types)[0];
    this.setState({ activeService: id, activeAction });
  }

  render() {
    const { services, params } = this.props;
    const { activeService, activeAction, stateString } = this.state;
    const { handleServiceSelect, handleActionSelect } = this;
    return (
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">
            {config.title}
          </h1>
          <ServiceTabs
            services={services}
            activeService={activeService}
            handleServiceSelect={handleServiceSelect}
          />
          <ActionSelect
            services={services}
            activeAction={activeAction}
            activeService={activeService}
            handleActionSelect={handleActionSelect}
          />
          <ActionForm
            activeService={activeService}
            activeAction={activeAction}
            services={services}
            params={params}
          />
          <StateMonitor stateString={stateString} />
        </div>
      </section>
    );
  }
}
