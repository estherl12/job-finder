import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndusersService } from 'src/endusers/endusers.service';
import { EndusersController } from 'src/endusers/endusers.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './localstrategy';
import { EndusersModule } from 'src/endusers/endusers.module';
import { JwtStrategy } from './jwt.strategy';
import { enduser } from 'src/endusers/entities/endusers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([enduser]),
    // PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.registerAsync({
      useFactory:()=>({
        secret: 'secretKeys',
        signOptions: { expiresIn: '60m' },
      }),
     }),
     JwtModule,
     PassportModule,
  ],
  controllers: [AuthController, EndusersController],
  providers: [AuthService, EndusersService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
