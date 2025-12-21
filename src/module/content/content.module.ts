import { ContentManagementService } from '@contentModule/core/service/content-management.service';
import { MediaPlayerService } from '@contentModule/core/service/media-player.service';
import { AdminMovieController } from '@contentModule/http/rest/controller/admin-movie.controller';
import { MediaPlayerController } from '@contentModule/http/rest/controller/media-player.controller';
import { PersistenceModule } from '@contentModule/persistence/persistence.module';
import { ContentRepository } from '@contentModule/persistence/repository/content.repository';
import { VideoRepository } from '@contentModule/persistence/repository/video.repository';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@sharedModules/config/config.module';
import { HttpClientModule } from '@sharedModules/http-client/http-client.module';
import { AgeRecommendationService } from './core/service/age-recommendation.service';
import { VideoMetadataService } from './core/service/video-metadata.service';
import { VideoProfanityFilterService } from './core/service/video-profanity-filter.service';
import { ExternalMovieRatingClient } from './http/rest/client/external-movie-rating/externa-movie-rating.client';
import { AdminTvShowController } from './http/rest/controller/admin-tv-show.controller';

@Module({
  imports: [
    PersistenceModule.forRoot(),
    ConfigModule.forRoot(),
    HttpClientModule,
  ],
  controllers: [
    AdminMovieController,
    MediaPlayerController,
    AdminTvShowController,
  ],
  providers: [
    ContentManagementService,
    MediaPlayerService,
    ContentRepository,
    VideoRepository,
    ExternalMovieRatingClient,
    AgeRecommendationService,
    VideoMetadataService,
    VideoProfanityFilterService,
  ],
})
export class ContentModule {}
