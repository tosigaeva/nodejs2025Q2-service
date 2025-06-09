import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { PrismaService } from '../client/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private storage: PrismaService) {}

  async findAll(): Promise<User> {
    const users = await this.storage.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users.map((user) => ({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    }));
  }

  async findById(id: string): Promise<User> {
    const user = await this.storage.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async create(login: string, password: string) {
    const newUser: User = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await this.storage.user.create({
      data: {
        login: newUser.login,
        password: newUser.password,
        version: 1,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return this.sanitizeUser(newUser);
  }

  async update(user: User) {
    if (!(await this.getUnsanitizedUser(user.id))) {
      throw new NotFoundException(`User with id ${user.id} not found`);
    }
    await this.storage.user.update({
      where: { id: user.id },
      data: {
        password: user.password,
        version: user.version,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return this.sanitizeUser(user);
  }

  async delete(id: string) {
    try {
      await this.storage.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async validatePassword(id: string, password: string) {
    const user = await this.getUnsanitizedUser(id);
    return user.password === password;
  }

  private async getUnsanitizedUser(id: string) {
    const user = await this.storage.user.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  private sanitizeUser(user: User): User {
    const { password, ...sanitizedUser } = user;
    if (password.length < 0) console.info(password);
    return sanitizedUser as User;
  }
}
