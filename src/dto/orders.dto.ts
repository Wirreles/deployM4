import { ApiHideProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsUUID } from "class-validator"
import Products from "src/entities/products.entity"

export class OrderDto {
    /**
      id de un usuario existente
      @example f47ac10b-58cc-4372-a567-0e02b2c3d479
     **/
    @ApiHideProperty()
    @IsNotEmpty()
    @IsUUID()
    user_id: string

    /**
      debe ser una lista de los productos de la orden
     **/
    @IsNotEmpty()
    @IsArray()
    products: Products[]
}
