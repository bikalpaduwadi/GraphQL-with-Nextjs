import Movie from './movie';
import Nationality from '@/enums/Nationality';

export default interface User {
  id: number;
  age: number;
  name: string;
  friends: User;
  username: string;
  favoriteMovies: Movie[];
  nationality: Nationality;
}

export type UserTableView = Pick<User, 'id' | 'name' | 'username' | 'age' | 'nationality'>;

export type CreateUser = Pick<User, 'name' | 'username' | 'age' | 'nationality'>;
