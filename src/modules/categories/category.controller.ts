import { Controller, UseGuards, Get, Query, Param, Put, Delete, HttpCode, HttpStatus, Res, Post, Body, Patch, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/CategoryDto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { PagineteDto } from '../../common/dto/paginate.dto';
import { Response } from 'express';
import { NewCategoryDto } from './dto/NewCategoryDto';
import { plainToClass } from 'class-transformer';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @ApiCreatedResponse({ type: CategoryDto })
  @UseGuards(JwtAuthGuard)
  async getCategories(@Query() paginateDto: PagineteDto) {
    try {
      const categories = await this.categoryService.paginate(
        new PagineteDto(paginateDto),
      );

      return categories;
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: NewCategoryDto })
  @ApiCreatedResponse({
    description: 'Api create a new category',
    type: NewCategoryDto,
  })
  async createUser(@Body() usersDto: NewCategoryDto) {
    try {
      const category = await this.categoryService.createCategory(usersDto);
      return plainToClass(CategoryEntity, category);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @ApiCreatedResponse({ type: CategoryDto })
  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(JwtAuthGuard)
  async getCategory(@Param() params) {
    try {
      const category = await this.categoryService.findOne(params.id);
      return category;
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateCategoryDto })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiCreatedResponse({
    description: 'Api update a category',
    type: UpdateCategoryDto,
  })
  async updateUser(
    @Param('id') params,
    @Body() categoryDto: UpdateCategoryDto,
  ) {
    try {
      const resultUpdate = await this.categoryService.updateCategory(
        params.id,
        categoryDto,
      );
      if (resultUpdate.affected < 1) {
        throw new InternalServerErrorException('Update category fail')
      }

      const category = await this.categoryService.findOne(params.id);

      return plainToClass(CategoryEntity, category);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiCreatedResponse({
    description: 'Api restore a category',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async restoreCategory(@Param() params, @Res() res: Response) {
    try {
      await this.categoryService.restore(params.id);
      res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: 'number' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param() params, @Res() res: Response) {
    try {
      await this.categoryService.softDestroy(params.id);
      res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      throw error;
    }
  }
}
