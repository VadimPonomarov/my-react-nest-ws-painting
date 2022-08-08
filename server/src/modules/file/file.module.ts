import {Module} from "@nestjs/common";
/*import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";*/

/*import {configuration} from "../../config/configuration";*/
import {FileController} from "./file.controller";
import {FileService} from "./file.service";

@Module({
    imports: [/*MulterModule.register({
        storage: diskStorage({
            destination: configuration().multer_destination
        })
    })*/],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule {
}
