import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CarVariantDto {
    @ApiProperty({ example: '1.5 Oreal', description: 'The name of the car variant' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Powerful engine with great mileage', description: 'Description of the car variant' })
    @IsNotEmpty()
    @IsString()
    description: string;
}
