import { ContentManagementService } from '@contentModule/core/service/content-management.service';
import { CreateEpisodeRequestDto } from '@contentModule/http/rest/dto/request/create-episode-request.dto';
import { CreateTvShowRequestDto } from '@contentModule/http/rest/dto/request/create-tv-show-request.dto';
import { CreateEpisodeResponseDto } from '@contentModule/http/rest/dto/response/create-episode-response.dto';
import { CreateTvShowResponseDto } from '@contentModule/http/rest/dto/response/create-tv-show-response.dto';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Request } from 'express';
import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

@Controller('admin/tv-show')
export class AdminTvShowController {
  constructor(
    private readonly contentManagementService: ContentManagementService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          return cb(
            null,
            `${Date.now()}-${randomUUID()}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'image/jpeg') {
          return cb(
            new BadRequestException(
              'Invalid file type. Only image/jpeg is supported for thumbnails.',
            ),
            false,
          );
        }
        return cb(null, true);
      },
    }),
  )
  async createTvShowContent(
    @Req() _req: Request,
    @Body() contentData: CreateTvShowRequestDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<CreateTvShowResponseDto> {
    if (!thumbnail) {
      throw new BadRequestException('Thumbnail file is required.');
    }

    const MAX_THUMBNAIL_SIZE = 1024 * 1024; // 1 megabyte
    if (thumbnail.size > MAX_THUMBNAIL_SIZE) {
      throw new BadRequestException('Thumbnail size exceeds the limit.');
    }
    const content = await this.contentManagementService.createTvShow({
      title: contentData.title,
      description: contentData.description,
      thumbnailUrl: thumbnail.path,
    });
    return {
      id: content.id,
      //TODO fix !
      tvShowId: content.tvShow!.id,
      title: content.title,
      description: content.description,
      thumbnailUrl: content.tvShow?.thumbnail?.url,
    };
  }

  @Post(':contentId/upload-episode')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          return cb(
            null,
            `${Date.now()}-${randomUUID()}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'video/mp4') {
          return cb(
            new BadRequestException(
              'Invalid file type. Only video/mp4 is supported for videos.',
            ),
            false,
          );
        }
        return cb(null, true);
      },
    }),
  )
  async uploadEpisodeToTvShowContent(
    @Req() _req: Request,
    @Body() episodeData: CreateEpisodeRequestDto,
    @Param('contentId') contentId: string,
    @UploadedFile() video: Express.Multer.File,
  ): Promise<CreateEpisodeResponseDto> {
    if (!video) {
      throw new BadRequestException('Video file is required.');
    }

    const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1 gigabyte
    if (video.size > MAX_FILE_SIZE) {
      throw new BadRequestException('Video size exceeds the limit.');
    }

    const createdEpisode = await this.contentManagementService.createEpisode(
      contentId,
      {
        ...episodeData,
        videoUrl: video.path,
        videoSizeInKb: video.size,
      },
    );

    return {
      id: createdEpisode.id,
      title: createdEpisode.title,
      description: createdEpisode.description,
      videoUrl: createdEpisode.video?.url,
      duration: createdEpisode.video?.duration,
      sizeInKb: createdEpisode.video?.sizeInKb,
    };
  }
}
