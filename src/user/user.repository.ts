import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaService } from '../client/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private storage: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.storage.user.findMany({});
    return users.map(this.sanitizeUser);
  }

  async findById(id: string): Promise<User> {
    const user = await this.storage.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('User not found');
    return this.sanitizeUser(user);
  }

  async findByLogin(login: string) {
    return this.storage.user.findUnique({ where: { login } });
  }

  async create(login: string, password: string) {
    try {
      await this.storage.user.delete({ where: { login } });
    } catch {}
    const newUser = await this.storage.user.create({
      data: {
        login: login,
        password: password,
        version: 1,
      },
    });

    return this.sanitizeUser(newUser);
  }

  async update(user: User) {
    if (!(await this.getUnsanitizedUser(user.id))) {
      throw new NotFoundException(`User with id ${user.id} not found`);
    }
    const updatedUser = await this.storage.user.update({
      where: { id: user.id },
      data: {
        password: user.password,
        version: user.version,
        updatedAt: new Date(),
      },
    });
    return this.sanitizeUser(updatedUser);
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
    const user = await this.storage.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  private sanitizeUser(user: User): User {
    const { password, ...sanitizedUser } = user;
    if (password.length < 0) console.info(password);
    return {
      ...sanitizedUser,
      createdAt: (sanitizedUser.createdAt as Date).getTime(),
      updatedAt: (sanitizedUser.updatedAt as Date).getTime(),
    } as User;
  }
}
