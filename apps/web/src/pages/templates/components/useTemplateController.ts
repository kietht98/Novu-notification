import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreateNotificationTemplateDto, INotificationTemplate, IUpdateNotificationTemplateDto } from '@novu/shared';

import { useTemplateFetcher } from './useTemplateFetcher';
import { QueryKeys } from '../../../api/query.keys';
import { successMessage } from '../../../utils/notifications';
import { createTemplate, deleteTemplateById, updateTemplate } from '../../../api/notification-templates';

export function useTemplateController(templateId?: string) {
  const { template, refetch, loading: isLoading } = useTemplateFetcher(templateId);
  const client = useQueryClient();

  const { isLoading: isCreating, mutateAsync: createNotificationTemplate } = useMutation<
    INotificationTemplate,
    { error: string; message: string; statusCode: number },
    ICreateNotificationTemplateDto
  >(createTemplate, {
    onSuccess: async () => {
      await client.refetchQueries([QueryKeys.changesCount]);
      successMessage('Template saved successfully');
    },
  });

  const { isLoading: isUpdating, mutateAsync: updateNotificationTemplate } = useMutation<
    INotificationTemplate,
    { error: string; message: string; statusCode: number },
    { id: string; data: Partial<IUpdateNotificationTemplateDto> }
  >(({ id, data }) => updateTemplate(id, data), {
    onSuccess: async () => {
      refetch();
      await client.refetchQueries([QueryKeys.changesCount]);
      successMessage('Template updated successfully');
    },
  });

  const { isLoading: isDeleting, mutate: deleteNotificationTemplate } = useMutation<
    unknown,
    { error: string; message: string; statusCode: number }
  >(() => {
    if (!templateId) {
      return Promise.resolve();
    }

    return deleteTemplateById(templateId);
  });

  return {
    template,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    updateNotificationTemplate,
    createNotificationTemplate,
    deleteNotificationTemplate,
  };
}
