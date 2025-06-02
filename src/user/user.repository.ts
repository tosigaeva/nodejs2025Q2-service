import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UserRepository {
  private users = new Map<string, User>();

  findAll(): User[] {
    return Array.from(this.users.values()).map(this.sanitizeUser);
  }

  findById(id: string): User {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.sanitizeUser(user);
  }

  create(login: string, password: string): User {
    const newUser: User = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.set(newUser.id, newUser);
    return this.sanitizeUser(newUser);
  }

  update(user: User): User {
    if (!this.users.has(user.id)) {
      throw new NotFoundException(`User with id ${user.id} not found`);
    }
    this.users.set(user.id, user);
    return this.sanitizeUser(user);
  }

  delete(id: string): void {
    if (!this.users.delete(id)) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  private sanitizeUser(user: User): User {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser as User;
  }
}
