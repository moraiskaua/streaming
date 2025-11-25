import { Module } from '@nestjs/common';
import { ContentManagementService } from '@src/core/service/content-management.service';
import { MediaPlayerService } from '@src/core/service/media-player.service';
import { ContentController } from '@src/http/rest/controller/content.controller';
import { PrismaService } from '@src/persistence/prisma/prisma.service';
import { ContentRepository } from './persistence/repository/content.repository';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [PrismaService, ContentManagementService, MediaPlayerService, ContentRepository],
})
export class AppModule { }