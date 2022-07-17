import {Injectable} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FileService {

    imgSave(id: string, data) {
        const fileData = data.img.replace("data:image/png;base64,", "");
        return fs.writeFileSync(
            path.join(process.cwd(), "upload", `${id}.jpg`),
            fileData,
            "base64"
        );
    }

    getImg(id: string) {
        const fileData = fs.readFileSync(path.join(process.cwd(), "upload", `${id}.jpg`));
        const img_base64 = "data:image/png;base64," + fileData.toString("base64");
        return img_base64;
    }
}
