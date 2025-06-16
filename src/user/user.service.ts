import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll() {
    return await this.userRepository.findAll();
  }

  async getById(id: string) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findByLogin(login);
    if (!user) {
      throw new NotFoundException(`User with login "${login}" not found`);
    }
    return user;
  }

  async create(login: string, password: string) {
    if (!login?.trim() || !password?.trim()) {
      throw new BadRequestException('Login and password are required');
    }

    return await this.userRepository.create(login, password);
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    if (!newPassword?.trim()) {
      throw new BadRequestException('New password is required');
    }

    const user = await this.userRepository.findById(id);
    if (!(await this.userRepository.validatePassword(id, oldPassword))) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    return await this.userRepository.update(updatedUser);
  }

  async delete(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
