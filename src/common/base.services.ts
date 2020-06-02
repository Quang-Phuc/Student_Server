import {paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PagineteDto } from './dto/paginate.dto';
import { isNil } from 'lodash';

@Injectable()
export abstract class BaseServices {
  constructor(private readonly repository) {}

  /**
   * @param  {PagineteDto} options
   */
  async paginate(options: PagineteDto, callback?: Function): Promise<Pagination<any>> {
    const queryBuilder = this.repository.createQueryBuilder();

    if (options.order) {
      const orderObj = {};

      options.order.split(',').forEach(function(order) {
        let sortSign = '+';

        if (/^[-+]/.test(order)) {
          order = order.substring(1);
          sortSign = order.slice(1);
        }

        orderObj[order] = sortSign === '+' ? 'ASC' : 'DESC';
      });

      queryBuilder.orderBy(orderObj);

      if (callback) {
        callback(queryBuilder)
      }

      queryBuilder.getMany()
    }
    return paginate<any>(queryBuilder, options);
  }

  /**
   * @param  {any} findData
   * @returns Promise
   */
  abstract findOne(findData: any): Promise<any>;

  /**
   * @param  {number} id
   * @param  {string} model
   */
  async restore(id: number, model: string): Promise<any> {
    const entity = this.repository.findOne(id);
    if (isNil(entity)) {
      throw new NotFoundException(`Not found ${model} id #${id}`);
    }

    return this.repository.restore(id);
  }

  /**
   * @param  {number} id
   * @param  {string} model
   */
  async softDestroy(id: number, model: string): Promise<any> {
    const entity = this.repository.findOne(id);
    if (isNil(entity)) {
      throw new NotFoundException(`Not found ${model} id #${id}`);
    }

    return this.repository.softDelete(id);
  }
}
