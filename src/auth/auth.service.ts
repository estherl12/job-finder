import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EndusersService } from 'src/endusers/endusers.service';
import { enduser } from 'src/endusers/entities/endusers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly endusersService: EndusersService,
        private jwtService: JwtService,
        @InjectRepository(enduser) private enduserRepository: Repository<enduser>,
      ) {}
      async tokenGenerator(user:enduser) {
           
            const playload = { email: user.email,role:user.role, sub: user.id };
            const token =  this.jwtService.sign(playload);
        
            return token;
            }
      }


