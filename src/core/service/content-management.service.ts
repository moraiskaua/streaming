import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PrismaService } from "../../persistence/prisma/prisma.service";

export interface CreateContentDto {
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    sizeInKb: number;
}

@Injectable()
export class ContentManagementService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async createContent(createContentDto: CreateContentDto) {
        const { title, description, url, thumbnailUrl, sizeInKb } = createContentDto;

        return await this.prismaService.video.create({
            data: {
                id: randomUUID(),
                title,
                description,
                url,
                thumbnailUrl,
                sizeInKb,
                duration: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }
}
