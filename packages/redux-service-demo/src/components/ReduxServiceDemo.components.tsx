import * as React from 'react';
import { IReduxServiceList } from '../types';

export const renderActionOption = (optionName: string) => (<option key={optionName} value={optionName}>{optionName}</option>);

export function renderTab(serviceName: string, activeService: string,
  handleServiceSelect: (event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => void) {
  const activeClass = activeService === serviceName ? 'is-active' : '';
  const tabIndex = -1 as number;
  return (
    <li key={serviceName} className={activeClass}>
      <a
        id={serviceName}
        onClick={handleServiceSelect}
        onKeyPress={handleServiceSelect}
        role="button"
        tabIndex={tabIndex}
      >
        {serviceName}
      </a>
    </li>
  );
}

interface IServiceTabsProps {
  services: IReduxServiceList;
  activeService: string;
  handleServiceSelect: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
export const ServiceTabs = ({ services, activeService, handleServiceSelect }: IServiceTabsProps) => {
  const serviceNames = Object.keys(services);
  return (
    <div className="tabs is-centered">
      <ul>
        { serviceNames.map(item => renderTab(item, activeService, handleServiceSelect)) }
      </ul>
    </div>
  );
};

interface IActionSelectProps {
  services: IReduxServiceList;
  activeService: string;
  activeAction: string;
  handleActionSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ActionSelect = ({
  services,
  activeService,
  activeAction,
  handleActionSelect,
}: IActionSelectProps) => {
  const allActions = Object.keys(services[activeService].types);
  return (
    <div className="field">
      <div className="select is-fullwidth is-medium">
        <select id="action-select" onChange={handleActionSelect} value={activeAction}>
          { allActions.map(item => renderActionOption(item)) }
        </select>
      </div>
    </div>
  );
};

interface IStateMonitorProps {
  stateString: string;
}
export const StateMonitor = ({ stateString }: IStateMonitorProps) => (
  <div>
    <pre className="state">
      {stateString}
    </pre>
  </div>
);

export const stateToString = (state: any) => JSON.stringify(state, null, 2);
