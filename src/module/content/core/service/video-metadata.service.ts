import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoMetadataService {
  async getVideoDurantaion(_videoPath: string): Promise<number> {
    return 100;
  }
}
