import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcrypt'

export type Roles = 'client' | 'admin'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column('text')
  @ApiProperty()
  email: string

  @Column('text', { select: false })
  @ApiProperty()
  password: string

  @Column({
    type: 'enum',
    enum: ['client', 'admin'],
    default: 'client',
  })
  @ApiProperty()
  acl: Roles

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }
}
