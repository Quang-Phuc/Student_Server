import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import { BaseServices } from '../../common/base.services';
import { FindConditions } from 'typeorm';
import { NewCategoryDto } from './dto/NewCategoryDto';
import { isNil } from 'lodash';
import { Not } from 'typeorm';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';
@Injectable()
export class CategoryService extends BaseServices {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: CategoryRepository,
  ) {
    super(categoryRepository);
  }

  /**
   * @param  {FindConditions<CategoryEntity>} findData
   * @returns Promise
   */
  async findOne(
    findData: FindConditions<CategoryEntity>,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.findOne(findData);
  }

  async createCategory(newCategoryDto: NewCategoryDto) {
    try {
      const newUser = await this.categoryRepository.create({
        ...newCategoryDto,
      });
      return this.categoryRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne(id);

      if (isNil(category)) {
        throw new NotFoundException('Not found category');
      }

      const duplicateCategory = await this.categoryRepository.findOne({
        where: { name: UpdateCategoryDto.name, id: Not(id) },
      });

      if (duplicateCategory) {
        throw new BadRequestException('Name is exists')
      }

      return this.categoryRepository.update(category, {
        ...updateCategoryDto,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param  {number} id
   */
  async restore(id: number) {
    return super.restore(id, 'category');
  }

  /**
   * @param  {number} id
   */
  async softDestroy(id: number) {
    return super.softDestroy(id, 'category');
  }
}
