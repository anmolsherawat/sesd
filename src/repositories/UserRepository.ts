import { User } from '../models/User';
import { MockDatabase } from '../config/MockDatabase';

export class UserRepository {
  private db: MockDatabase;

  constructor() {
    this.db = MockDatabase.getInstance();
  }

  public findAll(): User[] {
    return Array.from(this.db.getUsers().values());
  }

  public findById(id: string): User | undefined {
    return this.db.getUsers().get(id);
  }

  public findByEmail(email: string): User | undefined {
    return Array.from(this.db.getUsers().values()).find(user => user.getEmail() === email);
  }

  public save(user: User): User {
    this.db.getUsers().set(user.getId(), user);
    return user;
  }

  public deleteById(id: string): boolean {
    return this.db.getUsers().delete(id);
  }
}
