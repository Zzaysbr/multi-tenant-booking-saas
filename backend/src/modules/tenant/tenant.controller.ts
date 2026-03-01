import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Param, Delete } from '@nestjs/common';


@Controller('tenants')
@UseGuards(JwtGuard, RoleGuard)
export class TenantController {
    constructor(private tenantService: TenantService) {}

    @Post()
    @Roles('owner')
    create(@CurrentUser() user: any, @Body() dto: CreateTenantDto){
        return this.tenantService.create(user.sub, dto.name, dto.timezone);
    }

    @Get('mine')
    @Roles('owner')
    findMine(@CurrentUser() user: any) {
        return this.tenantService.findMine(user.sub);
    }

    @Get()
    @Roles('admin')
    findAll() {
        return this.tenantService.findAll();
    }
    

    @Delete(':id')
    @Roles('owner')
    softDelete(
        @Param('id') id: string,
        @CurrentUser() user: any) {
            return this.tenantService.softDelete(id, user.sub);
        }
}