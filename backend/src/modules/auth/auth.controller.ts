import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Throttle } from '@nestjs/throttler';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} // inject auth service

    @Post('register')
    register(@Body() dto: RegisterDto){
        return this.authService.register(dto.email, dto.password, dto.role);
    }

    @Throttle({ default: { ttl: 60000, limit: 5 } })
    @Post('login')
    login(@Body() dto: LoginDto){
        return this.authService.login(dto.email, dto.password);
    }

    @Get('me')
    @UseGuards(JwtGuard)
    me(@CurrentUser() user: any) {
        return user;
    }
}



