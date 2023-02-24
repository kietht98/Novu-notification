import {
  BuilderFieldOperator,
  BuilderFieldType,
  BuilderGroupValues,
  FilterPartTypeEnum,
  TimeOperatorEnum,
} from '@novu/shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class BaseFilterPart {
  on: FilterPartTypeEnum;
}

class BaseFieldFilterPart extends BaseFilterPart {
  @ApiProperty()
  field: string;

  @ApiProperty()
  value: string;

  @ApiProperty({
    enum: [
      'LARGER',
      'SMALLER',
      'LARGER_EQUAL',
      'SMALLER_EQUAL',
      'EQUAL',
      'NOT_EQUAL',
      'ALL_IN',
      'ANY_IN',
      'NOT_IN',
      'BETWEEN',
      'NOT_BETWEEN',
      'LIKE',
      'NOT_LIKE',
      'IN',
    ],
  })
  operator: BuilderFieldOperator;
}

class FieldFilterPart extends BaseFieldFilterPart {
  @ApiProperty({
    enum: [FilterPartTypeEnum.SUBSCRIBER, FilterPartTypeEnum.PAYLOAD],
  })
  on: FilterPartTypeEnum.SUBSCRIBER | FilterPartTypeEnum.PAYLOAD;
}

class WebhookFilterPart extends BaseFieldFilterPart {
  @ApiProperty({
    enum: [FilterPartTypeEnum.WEBHOOK],
  })
  on: FilterPartTypeEnum.WEBHOOK;

  @ApiPropertyOptional()
  webhookUrl: string;
}

class RealtimeOnlineFilterPart extends BaseFilterPart {
  @ApiProperty({
    enum: [FilterPartTypeEnum.IS_ONLINE],
  })
  on: FilterPartTypeEnum.IS_ONLINE;

  @ApiProperty()
  value: boolean;
}

class OnlineInLastFilterPart extends BaseFilterPart {
  @ApiProperty({
    enum: [FilterPartTypeEnum.IS_ONLINE_IN_LAST],
  })
  on: FilterPartTypeEnum.IS_ONLINE_IN_LAST;

  @ApiProperty({
    enum: TimeOperatorEnum,
  })
  timeOperator: TimeOperatorEnum;

  @ApiProperty()
  value: number;
}

type FilterParts = FieldFilterPart | WebhookFilterPart | RealtimeOnlineFilterPart | OnlineInLastFilterPart;

export class StepFilter {
  @ApiProperty()
  isNegated: boolean;

  @ApiProperty({
    enum: ['BOOLEAN', 'TEXT', 'DATE', 'NUMBER', 'STATEMENT', 'LIST', 'MULTI_LIST', 'GROUP'],
  })
  type: BuilderFieldType;

  @ApiProperty({
    enum: ['AND', 'OR'],
  })
  value: BuilderGroupValues;

  @ApiProperty({
    type: [FieldFilterPart, WebhookFilterPart, RealtimeOnlineFilterPart, OnlineInLastFilterPart],
  })
  children: FilterParts[];
}
