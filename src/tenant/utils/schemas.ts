import { Category } from '../../app/models/Category';
import { Ingredient } from '../../app/models/Ingredient';
import { Order } from '../../app/models/Order';
import { Product } from '../../app/models/Product';
import { User } from '../../app/models/User';
import { tenantSchema } from '../schemas/tenant';
import { tenantUserSchema } from '../schemas/tenantUser';

export const schemas = [
  {
    modelName: 'User',
    schema: User
  },
  {
    modelName: 'Product',
    schema: Product
  },
  {
    modelName: 'Order',
    schema: Order
  },
  {
    modelName: 'Category',
    schema: Category
  },
  {
    modelName: 'Ingredient',
    schema: Ingredient
  }
];

export const tenantSchemas = [
  {
    modelName: 'organizations',
    schema: tenantSchema
  },
  {
    modelName: 'users',
    schema: tenantUserSchema
  }
];
