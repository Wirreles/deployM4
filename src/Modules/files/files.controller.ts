import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService} from './files.services';
import { Controller, Post, ParseUUIDPipe, Param, UseInterceptors,
     UploadedFile, ParseFilePipe, MaxFileSizeValidator, 
     FileTypeValidator,
     UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/guards/roles.guards';

@ApiTags('files')
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(AuthGuard, RolesGuard)
@Controller('files')
export class FilesController{
    constructor(private readonly filesService: FilesService) {}

    @Post("uploadimage/:id")
    @UseInterceptors(FileInterceptor("image"))
    updateImg(@Param("id", ParseUUIDPipe) id:string, @UploadedFile(new ParseFilePipe({validators:
        [new MaxFileSizeValidator({maxSize: 200000, message:"El tamaño de la imagen es mayor a 200kb"}), 
         new FileTypeValidator({fileType: /(jpg|jpeg|png|svg|ico|webp)$/ })  
        ]})) file: Express.Multer.File){
        return this.filesService.updateImage(id, file)
    }
}