import { Controller, Get } from '@nestjs/common';

@Controller()
export class MainController {
  //constructor(private readonly appService: TestService) {}

  @Get()
  getHello(): string {
    return 'Hello World';
  }
}
