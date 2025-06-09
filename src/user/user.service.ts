import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

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

  create(login: string, password: string): User {
    if (!login?.trim() || !password?.trim()) {
      throw new BadRequestException('Login and password are required');
    }

    return this.userRepository.create(login, password);
  }

  updatePassword(id: string, oldPassword: string, newPassword: string): User {
    if (!newPassword?.trim()) {
      throw new BadRequestException('New password is required');
    }

    if (!this.userRepository.validatePassword(id, oldPassword)) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const user = this.userRepository.findById(id);
    const updatedUser = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    return this.userRepository.update(updatedUser);
  }

  delete(id: string): void {
    try {
      this.userRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
