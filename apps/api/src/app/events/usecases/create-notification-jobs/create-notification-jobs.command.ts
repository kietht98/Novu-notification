// TODO: We shouldn't be importing from DAL here. Needs big refactor throughout monorepo.
import { NotificationTemplateEntity, SubscriberEntity } from '@novu/dal';
import { ChannelTypeEnum, ISubscribersDefine } from '@novu/shared';
import { IsDefined, IsString, IsOptional } from 'class-validator';

import { EnvironmentWithUserCommand } from '../../../shared/commands/project.command';

export class CreateNotificationJobsCommand extends EnvironmentWithUserCommand {
  @IsDefined()
  @IsString()
  identifier: string;

  @IsDefined()
  overrides: Record<string, Record<string, unknown>>;

  @IsDefined()
  payload: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  @IsDefined()
  subscriber: SubscriberEntity;

  @IsDefined()
  template: NotificationTemplateEntity;

  @IsDefined()
  templateProviderIds: Map<ChannelTypeEnum, string>;

  @IsDefined()
  to: ISubscribersDefine;

  @IsString()
  @IsDefined()
  transactionId: string;

  @IsOptional()
  actor?: SubscriberEntity;
}
