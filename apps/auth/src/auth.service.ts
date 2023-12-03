import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './entities/user.provider';
import { UserRole } from './user-role.enum';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dtos';
import { hashPassword } from 'utils/hashing';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(USER_REPOSITORY) private _userRepository: Repository<UserEntity>,
  ) {
    this.defaultUsers().then(() => {
      console.log('Default users created');
    });
  }

  async createUser(username: string, password: string, role = UserRole.Reader) {
    const user = await this._userRepository.findOne({
      where: { username },
    });
    if (user) {
      return user;
    }
    {
      const user = new UserEntity();
      user.username = username;
      user.password = hashPassword(password);
      user.role = role;
      await this._userRepository.save(user);

      return user;
    }
  }

  async defaultUsers() {
    await this.createUser('admin', 'admin', UserRole.Admin);
    await this.createUser('reader', 'reader', UserRole.Reader);
  }

  async validateUser(username: string, password: string) {
    const user = await this._userRepository.findOne({ where: { username } });

    if (user && user.password === hashPassword(password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login({ username, password }: LoginDto) {
    const user = await this.validateUser(username, password);

    if (!user) {
      return null;
    }

    const payload = { id: user.id, username: user.username, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
