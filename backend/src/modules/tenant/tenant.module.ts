import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { RoleGuard } from '../../common/guards/role.guard';

@Module({
  controllers: [TenantController],
  providers: [TenantService, RoleGuard]
})
export class TenantModule {}
