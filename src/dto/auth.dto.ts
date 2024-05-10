import { PickType } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator"
import { UserDto } from 'src/dto/users.dto';

export class AuthDto extends PickType(UserDto, ['password', 'email']) {}
