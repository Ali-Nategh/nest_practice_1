import { ConfigService } from '@nestjs/config/dist';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        });
    }

    cleanDb() {
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ])
    }
};
