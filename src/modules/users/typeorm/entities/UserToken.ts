import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_token')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default UserToken;
