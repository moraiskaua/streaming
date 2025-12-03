import { ContentManagementService } from '@contentModule/core/service/content-management.service';
import { MediaPlayerService } from '@contentModule/core/service/media-player.service';
import { MediaPlayerController } from '@contentModule/http/rest/controller/media-player.controller';
import { VideoUploadController } from '@contentModule/http/rest/controller/video-upload.controller';
import { PersistenceModule } from '@contentModule/persistence/persistence.module';
import { ContentRepository } from '@contentModule/persistence/repository/content.repository';
import { VideoRepository } from '@contentModule/persistence/repository/video.repository';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@sharedModules/config/config.module';
import { HttpClient } from '@sharedModules/http-client/client/http.client';
import { ExternalMovieRatingClient } from './http/rest/client/external-movie-rating/externa-movie-rating.client';

@Module({
  imports: [PersistenceModule.forRoot(), ConfigModule.forRoot()],
  controllers: [VideoUploadController, MediaPlayerController],
  providers: [
    ContentManagementService,
    MediaPlayerService,
    ContentRepository,
    VideoRepository,
    ExternalMovieRatingClient,
    HttpClient,
  ],
})
export class ContentModule { }
