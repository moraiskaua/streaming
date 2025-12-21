import { Video } from '@contentModule/persistence/entity/video.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoProfanityFilterService {
  async filterProfanity(_video: Video) {
    return 'profanity-filtered';
  }
}
