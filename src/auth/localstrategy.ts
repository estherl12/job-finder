import { Injectable, Logger, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local';
import * as bcrypt from 'bcrypt';
import { AuthService } from "./auth.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EndusersService } from "src/endusers/endusers.service";
import { enduser } from "src/endusers/entities/endusers.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    
 private readonly logger = new Logger(LocalStrategy.name);

    constructor(
    @InjectRepository(enduser) 
    private readonly endUserRepository:Repository<enduser> ,
    private readonly authService:AuthService,
    private readonly enduserService:EndusersService)
    {
        super({
            usernameField: 'email',
            passwordField:'password'
        })
    }

    async validate(email: string, password: string):Promise<enduser> {
        
        const user = await this.endUserRepository.findOne({where:{email}});

        if (!user) {
        throw new NotAcceptableException('could not find the users');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        
        if (user && passwordValid) {
            return user;
        }
        else {
            throw new UnauthorizedException("Unauthorized");
          }
    }
}