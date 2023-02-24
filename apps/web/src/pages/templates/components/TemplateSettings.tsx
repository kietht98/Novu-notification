import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, useMantineColorScheme } from '@mantine/core';
import styled from '@emotion/styled';

import { Button, colors } from '../../../design-system';
import { NotificationSettingsForm } from './notification-setting-form/NotificationSettingsForm';
import { TemplatesSideBar } from './TemplatesSideBar';
import { TriggerSnippetTabs } from './TriggerSnippetTabs';
import { ActivePageEnum } from '../editor/TemplateEditorPage';
import { Trash } from '../../../design-system/icons';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { useEnvController } from '../../../hooks';
import { useTemplateEditor } from './TemplateEditorProvider';
import { deleteTemplateById } from '../../../api/notification-templates';
import { ROUTES } from '../../../constants/routes.enum';

export const TemplateSettings = ({ activePage, setActivePage, templateId }) => {
  const { colorScheme } = useMantineColorScheme();
  const { readonly } = useEnvController();
  const { template, editMode, trigger } = useTemplateEditor();
  const [toDelete, setToDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const confirmDelete = async () => {
    setIsDeleting(true);
    setIsError(undefined);
    try {
      await deleteTemplateById(templateId);
      setIsDeleting(false);
      setToDelete(false);
      navigate(ROUTES.TEMPLATES);
    } catch (e: any) {
      setIsDeleting(false);
      setIsError(e?.message || 'Unknown error');
    }
  };

  const cancelDelete = () => {
    setToDelete(false);
    setIsDeleting(false);
  };

  const onDelete = () => {
    setIsError(undefined);
    setToDelete(true);
  };

  return (
    <div style={{ marginLeft: 12, marginRight: 12, padding: 17.5, minHeight: 500 }}>
      <Grid grow style={{ minHeight: 500 }}>
        <Grid.Col md={4} sm={6}>
          <SideBarWrapper dark={colorScheme === 'dark'} style={{ paddingRight: 50 }}>
            <TemplatesSideBar
              activeTab={activePage}
              changeTab={setActivePage}
              showTriggerSection={!!template && !!trigger}
            />
          </SideBarWrapper>
        </Grid.Col>
        <Grid.Col md={8} sm={6} style={{ position: 'relative' }}>
          <div style={{ paddingLeft: 23 }}>
            {activePage === ActivePageEnum.SETTINGS && (
              <>
                <NotificationSettingsForm editMode={editMode} trigger={trigger} />
                {editMode && (
                  <DeleteNotificationButton
                    mt={10}
                    variant="outline"
                    disabled={readonly}
                    data-test-id="delete-notification-button"
                    onClick={onDelete}
                  >
                    <Trash
                      style={{
                        marginRight: '5px',
                      }}
                    />
                    Delete Template
                  </DeleteNotificationButton>
                )}
                <DeleteConfirmModal
                  target="notification template"
                  isOpen={toDelete}
                  confirm={confirmDelete}
                  cancel={cancelDelete}
                  isLoading={isDeleting}
                  error={isError}
                />
              </>
            )}

            {template && trigger && activePage === ActivePageEnum.TRIGGER_SNIPPET && (
              <TriggerSnippetTabs trigger={trigger} />
            )}
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

const SideBarWrapper = styled.div<{ dark: boolean }>`
  border-right: 1px solid ${({ dark }) => (dark ? colors.B20 : colors.BGLight)};
  height: 100%;
`;

const DeleteNotificationButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: rgba(229, 69, 69, 0.15);
  color: ${colors.error};
  box-shadow: none;
  :hover {
    background: rgba(229, 69, 69, 0.15);
  }
`;
