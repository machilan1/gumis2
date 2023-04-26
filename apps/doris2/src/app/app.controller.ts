import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { Car } from '@gumis2/data-access';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('cars')
  getCars() {
    return this.appService.getCars();
  }

  @Get('cars/:id')
  getCar(@Param('id') id: string) {
    return this.appService.getCar(id);
  }
  @Patch('cars/delete')
  deleteCar(@Body() id: string) {
    console.log(id);
    return this.appService.deleteCar(id);
  }
  @Patch('cars/:id')
  updateCar(@Param('id') id: string, @Body() body: Partial<Car>) {
    return this.appService.updateCar(id, body);
  }

  @Post('cars/new')
  addCar(@Body() body: Partial<Car>) {
    return this.appService.addCar(body);
  }
}
