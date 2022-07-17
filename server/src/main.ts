import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {configuration} from "./config/configuration";

async function bootstrap() {
    const PORT = configuration().port;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    });
    await app.listen(PORT,
        () => {
            console.log(`Server has started on port: ${PORT}`);
        })
        .catch(err => console.log(err.message));
}

bootstrap();
