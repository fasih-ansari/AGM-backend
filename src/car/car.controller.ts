import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
 
@ApiTags('car')
@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new car' })
    @ApiResponse({ status: 201, description: 'The car has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() createCarDto: CreateCarDto) {
        return this.carService.createCar(createCarDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all cars' })
    @ApiResponse({ status: 200, description: 'Successfully fetched all cars.' })
    async findAll() {
        return this.carService.getAllCars();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get car by ID' })
    @ApiResponse({ status: 200, description: 'Successfully fetched the car.' })
    async findOne(@Param('id') id: number) {
        return this.carService.getCarById(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update car by ID' })
    @ApiResponse({ status: 200, description: 'Successfully updated the car.' })
    async update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
        return this.carService.updateCar(id, updateCarDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete car by ID' })
    @ApiResponse({ status: 200, description: 'Successfully deleted the car.' })
    async remove(@Param('id') id: number) {
        return this.carService.deleteCar(id);
    }
}
