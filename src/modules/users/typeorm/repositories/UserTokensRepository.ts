import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {
    async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({
            where: {
                id: token,
            },
        });

        return userToken;
    }

    async generate(user_id: string): Promise<UserToken> {
        const userToken = await this.create({
            user_id,
        });

        await this.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
