import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'tools' })
export class Tool {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  email: string

  @Column('text')
  password: string

  @Column('text')
  description: string

  @Column('text', { array: true })
  tags: string[]

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date
}
