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
