export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

export abstract class User {
  protected id: string;
  protected name: string;
  protected email: string;
  protected role: UserRole;

  constructor(id: string, name: string, email: string, role: UserRole) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public abstract getInfo(): string;
}
