import { HttpException, HttpStatus } from '@nestjs/common';
import { UserFilter } from 'src/users/dto/create-user.dto';
import { Between, ILike } from 'typeorm';

export const buildUserFilter = async (queryParams: UserFilter) => {
  const query = {};

  if (queryParams?.email) query['email'] = queryParams.email.toLowerCase();
  if (queryParams?.name) {
    const name = queryParams?.name;
    if (name.includes(' ')) {
      const [first_name, last_name] = name.split(' ');
      query['first_name'] = ILike(`%${first_name}%`);
      query['last_name'] = ILike(`%${last_name}%`);
    } else {
      query['first_name'] = ILike(`%${name}%`);
    }
  }

  if (queryParams?.start_date && queryParams?.end_date) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(queryParams?.start_date)) {
      throw new HttpException(
        `use date format yy-mm-dd`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    query['created_at'] = Between(
      new Date(queryParams.start_date),
      new Date(queryParams.end_date),
    );
  }
  return query;
};
