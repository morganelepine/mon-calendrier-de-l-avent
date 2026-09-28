import { Request, Response, NextFunction } from "express";
import { getContents } from "../services/content.service";

export class ContentController {
    // GET /content/contents
    async getContents(request: Request, response: Response, next: NextFunction) {
        const contents = await getContents();

        // Cached by Vercel's CDN so app launches don't hit Neon: the DB is only
        // queried when the cache expires (1h), and a stale copy is served while
        // it refreshes in the background. Admin edits can take up to ~1h to show.
        // Set after the query so a failure (500) is never marked cacheable.
        response.setHeader(
            "Cache-Control",
            "public, s-maxage=3600, stale-while-revalidate=86400",
        );

        return {
            status: 200,
            contents,
        };
    }
}
