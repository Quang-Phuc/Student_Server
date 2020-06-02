import { Routes } from 'nest-router';
import { UserMoudle } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/documents/document.module';
import { CategoryModule } from './modules/categories/category.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/users',
        module: UserMoudle,
      },
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/documents',
        module: DocumentModule,
      },
      {
        path: '/categories',
        module: CategoryModule
      }
    ],
  },
];

export default routes;
