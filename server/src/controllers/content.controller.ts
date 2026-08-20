import { Request, Response, NextFunction } from "express";
import { getContents } from "../services/content.service";

export class ContentController {
    // GET /content/contents
    async getContents(request: Request, response: Response, next: NextFunction) {
        const contents = await getContents();

        return {
            status: 200,
            contents,
        };
    }
}
