import {BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res} from "@nestjs/common";
import {FileService} from "./file.service";
import {Response} from "express";

@Controller("image")
export class FileController {

    constructor(private fileService: FileService) {
    }

    @Get("")
    getImage(@Query("id") id: string, @Res() res: Response) {
        try {
            const img_base64 = this.fileService.getImg(id);
            return res.status(HttpStatus.OK)
                .send({img: img_base64});
        } catch (e) {
            res.send(new BadRequestException());
        }
    }

    @Post("")
    uploadImage(@Query("id") id: string, @Body() data, @Res() res: Response) {
        try {
            this.fileService.imgSave(id, data);
            return res.status(HttpStatus.OK).send('OK')
        } catch (e) {
            return res.send(new BadRequestException());
        }
    }

}
