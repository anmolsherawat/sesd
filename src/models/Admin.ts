import { User, UserRole } from './User';

export class Admin extends User {
  private department: string;

  constructor(id: string, name: string, email: string, department: string) {
    super(id, name, email, UserRole.ADMIN);
    this.department = department;
  }

  public getDepartment(): string {
    return this.department;
  }

  public setDepartment(department: string): void {
    this.department = department;
  }

  public getInfo(): string {
    return `Admin: ${this.name} (${this.email}) - Department: ${this.department}`;
  }
}
