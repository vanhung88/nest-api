import { v4 as uuidv4 } from 'uuid';

export const users = [
  {
    id: uuidv4(),
    name: 'John',
    age: 30,
    email: '88levanhung@gmail.com',
    password: '123',
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'Thomas',
    age: 21,
    email: 'hello@gmail.com',
    password: '456',
    status: 'active',
  },
];
