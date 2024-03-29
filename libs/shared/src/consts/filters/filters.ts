import { FilterPartTypeEnum } from '../../types';

export const FILTER_TO_LABEL = {
  [FilterPartTypeEnum.PAYLOAD]: 'Payload',
  [FilterPartTypeEnum.SUBSCRIBER]: 'Subscriber',
  [FilterPartTypeEnum.WEBHOOK]: 'Webhook',
  [FilterPartTypeEnum.IS_ONLINE]: 'Online right now',
  [FilterPartTypeEnum.IS_ONLINE_IN_LAST]: "Online in the last 'X' time period",
};
