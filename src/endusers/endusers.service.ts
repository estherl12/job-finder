import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createEndUserDto } from './dtos/enduser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { enduser } from './entities/endusers.entity';
import { EnduserupdateDto } from './dtos/enduserupdate.dto';
import { Role } from 'src/auth/enum/role.enum';
import { EmployerDto } from './dtos/employer.dto';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class EndusersService {
  constructor(
    @InjectRepository(enduser) private endUserRepo: Repository<enduser>,
    // @InjectRepository(Company) private companies:Repository<Company>,
    private readonly jwtService: JwtService,
    // private companyService: CompanyService,
  ) {}
  
  async getusers() {
    return await this.endUserRepo.findAndCount();
  }

  async findUser(id: number): Promise<enduser> {
    
    return await this.endUserRepo.findOne({
      where: { id: id },
    });
  }

  async createUsers(userDetails: createEndUserDto) {
    const newUsers = new enduser();

    const existingUser = await this.endUserRepo.findOne({
      where: [
        {
          email: userDetails.email,
        },
      ],
    });
    if (existingUser) {
      throw new BadRequestException('Already exit this user');
    }
    if (userDetails.password != userDetails.RetypePassword) {
      throw new BadRequestException('password did not match');
    }

    const password = userDetails.password;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    userDetails.password = hashedPassword;

    newUsers.email = userDetails.email;
    newUsers.mobile = userDetails.mobile;
    newUsers.name = userDetails.name;
    newUsers.password = userDetails.password;
    newUsers.role = Role.Applicant
    // await Object.assign(newUsers,userDetails);

    const playload = { username: newUsers.name, sub: newUsers.id , Role:newUsers.role};
    const token = this.jwtService.sign(playload);

    newUsers.accesstoken = token;
    const user = await this.endUserRepo.save(newUsers);

    return user;
  }

  async createEmployer(userDetails: EmployerDto) {
    const newUsers = new enduser();

    const existingUser = await this.endUserRepo.findOne({
      where: [
        {
          email: userDetails.email,
        },
      ],
    });
    if (existingUser) {
      throw new BadRequestException('Already exit this user');
    }
    if (userDetails.password != userDetails.RetypePassword) {
      throw new BadRequestException('password did not match');
    }

    // const company = await this
    const password = userDetails.password;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    userDetails.password = hashedPassword;

    newUsers.email = userDetails.email;
    newUsers.mobile = userDetails.mobile;
    newUsers.name = userDetails.name;
    newUsers.password = userDetails.password;
    newUsers.role = Role.Employer;
    // await Object.assign(newUsers,userDetails);

    const playload = { username: newUsers.name, sub: newUsers.id };
    const token = this.jwtService.sign(playload);

    newUsers.accesstoken = token;
    const user = await this.endUserRepo.save(newUsers);

    return user;
  }

  async updateUser(id: number, editDetails: EnduserupdateDto) {
    const olduser = await this.endUserRepo.findOne({
      where: { id: id },
    });
    // const NewUser = new enduser();

    olduser.password = editDetails.password;
    olduser.name = editDetails.name;
    olduser.email = editDetails.email;
    olduser.mobile = editDetails.mobile;
    
    return this.endUserRepo.save({
      ...olduser,
      ...editDetails,
    });
  }

  async deleteUser(id: number): Promise<any> {
    return this.endUserRepo.delete(id);
  }
}
