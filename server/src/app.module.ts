import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {ServeStaticModule} from "@nestjs/serve-static";

import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {configuration} from "./config/configuration";
import {WsModule} from "./modules/ws/ws.module";
import {WsGateway} from "./modules/ws/ws.gateway";
import {FileModule} from "./modules/file/file.module";
import {join} from "path";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), "upload"),
        }),
        WsModule,
        FileModule],
    controllers: [AppController],
    providers: [AppService, WsGateway],
})
export class AppModule {
}
