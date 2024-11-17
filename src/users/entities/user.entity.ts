import { BaseEntity } from 'src/base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Unique(['email'])
@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  first_name: string;

  @Column({ nullable: false, type: 'varchar' })
  last_name: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'text' })
  message: string;
}
