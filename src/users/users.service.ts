import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, IUser, UserFilter } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UtilService } from 'src/utils/utility-service';
import { buildUserFilter } from 'src/filters/query-filter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    const { email } = data;
    const emailExist = await this.usersRepository.exists({ where: { email } });
    if (emailExist) {
      throw new HttpException(
        `user with email: ${email} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const newUser: IUser = {
      ...data,
    };
    const createdUser = await this.usersRepository.save(newUser);
    await UtilService.sendPasswordMail(email);
    return createdUser;
  }

  async getAllUsers(queryParams: UserFilter) {
    const page = queryParams?.page ? Number(queryParams?.page) : 1;
    const size = queryParams?.size ? Number(queryParams.size) : 10;
    const skip = queryParams?.page ? (Number(queryParams.page) - 1) * size : 0;
    const query = await buildUserFilter(queryParams);
    const [users, count] = await this.usersRepository.findAndCount({
      where: query,
      skip,
      take: size,
      order: { created_at: 'DESC' },
    });

    const totalPages = Math.ceil(count / size);
    return {
      users,
      pagination: {
        totalRows: count,
        perPage: size,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
      },
    };
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user?.id) {
      throw new HttpException(
        `user with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async updateUserById(id: string, data: UpdateUserDto) {
    return this.usersRepository.update(id, data);
  }

  async deleteUserById(id: string) {
    return this.usersRepository.delete(id);
  }
}
