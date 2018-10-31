import { IReduxServiceDemoParams, IReduxServiceList } from '../types'

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
  return forms != null ? forms : [];
}
