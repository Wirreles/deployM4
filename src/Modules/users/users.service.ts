import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import User from '../../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../../dto/users.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'isAdmin' | 'password'>[]> {
    try {
      const start = (page - 1) * limit;
      const end = start + limit;
      const users: User[] = await this.userRepository.find();
      if (users.length === 0)
        throw new BadRequestException('No hay usuarios registrados');
      const usersList = users.slice(start, end);
      return usersList.map(
        ({ password, isAdmin, ...userNoPassword }) => userNoPassword,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al intentar traer los Usuarios',
      );
    }
  }

  async deleteUsers(id: string): Promise<Object> {
    try {
      const user: User = await this.userRepository.findOneBy({ id });
      if (!user)
        throw new BadRequestException(`El usuario con id: ${id} no existe`);
      await this.userRepository.delete(id);
      return { message: 'El usuario ha sido eliminado' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al intentar Eliminar el usuario',
      );
    }
  }

  async updateUsers(id: string, user: Partial<UserDto>): Promise<Object> {
    try {
      const usuario: User = await this.userRepository.findOneBy({ id });
      if (!usuario)
        throw new BadRequestException(`El usuario con id: ${id} no existe`);
      await this.userRepository.update(id, user);
      return { message: 'Usuario Actualizado Correctamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el Usuario');
    }
  }

  async getUserById(id: string): Promise<Omit<User, 'password' | 'isAdmin'>> {
      const users = await this.userRepository.findOne({
        where: { id },
        relations: {
          orders_id: true,
        },
      });
      if (!users)
        throw new BadRequestException(`El usuario con id: ${id} no existe`);
      const { password, isAdmin, ...userSincontra } = users;
      return userSincontra;
  }

  async updateAdmin(id: string): Promise<Object> {
      const user: User = await this.userRepository.findOneBy({ id });
      if (!user)
        throw new BadRequestException(`El usuario con id: ${id} no existe`);
      if (user.isAdmin === 'admin') {
        throw new BadRequestException('El usuario ya es un admin');
      } else {
        user.isAdmin = 'admin';
        await this.userRepository.save(user);
        return { message: `El usuario ${user.name} ahora, es admin!` };
      }
  }
}