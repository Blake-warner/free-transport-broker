/*import { Inject } from "@nestjs/common";
import {Cache, CACHE_MANAGER} from "cache-manager";
import {RedisClient} from 'redis';

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {
    }

    getClient(): RedisClient {
        const store: any = this.cacheManager.store;

        return store.getClient();
    }
}*/