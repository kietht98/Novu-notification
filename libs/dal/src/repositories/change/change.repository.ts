import { ChangeEntityTypeEnum } from '@novu/shared';
import { BaseRepository, Omit } from '../base-repository';
import { ChangeEntity } from './change.entity';
import { Change } from './change.schema';
import { Document, FilterQuery } from 'mongoose';

class PartialChangeEntity extends Omit(ChangeEntity, ['_environmentId', '_organizationId']) {}

type EnforceEnvironmentQuery = FilterQuery<PartialChangeEntity & Document> &
  ({ _environmentId: string } | { _organizationId: string });

export class ChangeRepository extends BaseRepository<EnforceEnvironmentQuery, ChangeEntity> {
  constructor() {
    super(Change, ChangeEntity);
  }

  public async getEntityChanges(
    organizationId: string,
    entityType: ChangeEntityTypeEnum,
    entityId: string
  ): Promise<ChangeEntity[]> {
    return await this.find(
      {
        _organizationId: organizationId,
        _entityId: entityId,
        type: entityType,
      },
      '',
      {
        sort: { createdAt: 1 },
      }
    );
  }

  public async getChangeId(environmentId: string, entityType: ChangeEntityTypeEnum, entityId: string): Promise<string> {
    const change = await this.findOne({
      _environmentId: environmentId,
      _entityId: entityId,
      type: entityType,
      enabled: false,
    });

    if (change?._id) {
      return change._id;
    }

    return BaseRepository.createObjectId();
  }

  public async getList(organizationId: string, environmentId: string, enabled: boolean, skip = 0, limit = 10) {
    const totalItemsCount = await this.count({
      _environmentId: environmentId,
      _organizationId: organizationId,
      enabled,
      _parentId: { $exists: false, $eq: null },
    });

    const items = await this.MongooseModel.find({
      _environmentId: environmentId,
      _organizationId: organizationId,
      enabled,
      _parentId: { $exists: false, $eq: null },
    })
      .skip(skip)
      .limit(limit)
      .populate('user');

    return { totalCount: totalItemsCount, data: this.mapEntities(items) };
  }

  public async getParentId(
    environmentId: string,
    entityType: ChangeEntityTypeEnum,
    entityId: string
  ): Promise<string | null> {
    const change = await this.findOne(
      {
        _environmentId: environmentId,
        _entityId: entityId,
        type: entityType,
        enabled: false,
        _parentId: { $exists: true },
      },
      '_parentId'
    );
    if (change?._parentId) {
      return change._parentId;
    }

    return null;
  }
}
