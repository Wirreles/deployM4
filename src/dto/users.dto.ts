import { ApiHideProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsString, Length, Matches } from "class-validator"

export class UserDto {   
    /**
     * Correo electrónico del usuario.
     * @example "user@example.com"
     */
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    /**
     * Nombre del usuario.
     * @example "John Doe"
     */
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string

    /**
     * Contraseña del usuario.
     * @example "P@ssw0rd"
     */
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
    @Length(8,15)
    password: string

    /**
     * Confirmación de la contraseña del usuario.
     * @example "P@ssw0rd"
     */
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
    @Length(8,15)
    confirmPassword: string

    /**
     * Dirección del usuario.
     * @example "123 Main St"
     */
    @IsString()
    @Length(3,80)
    address: string

    /**
     * Número de teléfono del usuario.
     * @example 1234567890
     */
    @IsInt()
    phone: number

    /**
     * País del usuario.
     * @example "USA"
     */
    @IsString()
    @Length(5,20)
    country?: string | undefined

    /**
     * Ciudad del usuario.
     * @example "New York"
     */
    @IsString()
    @Length(5,20)
    city?: string | undefined
    
    /**
     * Propiedad para ocultar el estado de administrador.
     */
    @ApiHideProperty()
    @IsEmpty()
    isAdmin:string
}
