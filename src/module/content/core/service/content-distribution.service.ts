import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentDistributionService {
  async distributeContent(_contentId: string) {
    return 'started';
  }
}
