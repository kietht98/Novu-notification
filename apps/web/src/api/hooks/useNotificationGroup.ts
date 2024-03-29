import { useQuery } from '@tanstack/react-query';
import { getNotificationGroups } from '../notification-groups';

export function useNotificationGroup() {
  const { data, isLoading } = useQuery(['notificationGroups'], getNotificationGroups);

  return {
    groups: data,
    loading: isLoading,
  };
}
