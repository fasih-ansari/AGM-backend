import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
    constructor(private prisma: PrismaService) { }

    async createCompany(name: string) {
        return this.prisma.carCompany.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }

    async createCarType(name: string, companyId: number) {
        return this.prisma.carType.upsert({
            where: { name_companyId: { name, companyId } },
            update: {},
            create: { name, companyId },
        });
    }

    async createCar(data: CreateCarDto) {
        const { company, car_type, car_name, car_year, variants } = data;
        const carCompany = await this.createCompany(company);
        const carType = await this.createCarType(car_type, carCompany.id);

        const car = await this.prisma.car.create({
            data: {
                name: car_name,
                type: { connect: { id: carType.id } },
                years: {
                    create: [{
                        year: car_year,
                        variants: { create: variants },
                    }]
                }
            },
        });

        return car;
    }

    async getAllCars() {
        return this.prisma.car.findMany({
            include: {
                type: {
                    include: {
                        company: true
                    }
                },
                years: {
                    include: {
                        variants: true
                    }
                }
            },
        });
    }

    async getCarById(id: number) {
        return this.prisma.car.findUnique({
            where: { id },
            include: {
                type: {
                    include: {
                        company: true
                    }
                },
                years: {
                    include: {
                        variants: true
                    }
                }
            },
        });
    }

    async updateCar(id: number, data: UpdateCarDto) {
        return this.prisma.car.update({
            where: { id },
            data,
        });
    }

    async deleteCar(id: number) {
        return this.prisma.car.delete({
            where: { id },
        });
    }
}
