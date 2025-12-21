import { Injectable } from '@nestjs/common';

@Injectable()
export class AgeRecommendationService {
  async getAgeRecommendationForContent(_videoUrl: string): Promise<number> {
    return await 5;
  }
}
