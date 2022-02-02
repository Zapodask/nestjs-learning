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
import { Field, ObjectType } from '@nestjs/graphql'

export enum Roles {
  Client = 'client',
  Admin = 'admin',
}

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  @ApiProperty()
  id: number

  @Column('text')
  @Field(() => String)
  @ApiProperty()
  email: string

  @Column('text', { select: false })
  @Field(() => String)
  @ApiProperty()
  password: string

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.Client,
  })
  @Field(() => String)
  @ApiProperty()
  acl: Roles

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => String)
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => String)
  @ApiProperty()
  updatedAt: Date

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }
}
