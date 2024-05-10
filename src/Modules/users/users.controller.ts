import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  HttpCode,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/AuthGuard';
import { UserDto } from '../../dto/users.dto';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { ApiBearerAuth,ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  getUsers(@Query('limit') limit: string, @Query('page') page: string) {
    if (page && limit) {
      return this.usersService.getUsers(Number(limit), Number(page));
    }
    return this.usersService.getUsers(1, 5);
  }

  @HttpCode(200)
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @HttpCode(200)
  @Put(':id')
  updateUsers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<UserDto>,
  ) {
    return this.usersService.updateUsers(id, user);
  }

  @HttpCode(200)
  @Delete(':id')
  deleteUsers(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUsers(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put(":id")
  updateAdmin(@Param('id', ParseUUIDPipe) id: string){
    return this.usersService.updateAdmin(id);
  }
}


