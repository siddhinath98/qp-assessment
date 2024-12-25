import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }
}
