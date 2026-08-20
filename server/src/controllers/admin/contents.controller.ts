import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";
import { ContentFamily } from "@prisma/client";

interface ListItemInput {
    title?: string;
    description?: string;
    author?: string;
    image?: string;
    url?: string;
}

export class AdminContentsController {
    // GET /admin/contents?dayNumber=3
    async list(request: Request, response: Response, next: NextFunction) {
        const dayNumberParam = request.query.dayNumber;
        const dayNumber =
            typeof dayNumberParam === "string" ? Number(dayNumberParam) : undefined;

        const contents = await prisma.content.findMany({
            where: dayNumber !== undefined ? { dayNumber } : undefined,
            select: {
                id: true,
                dayNumber: true,
                type: true,
                subType: true,
                title: true,
                published: true,
                isNew: true,
            },
            orderBy: [{ dayNumber: "asc" }, { id: "asc" }],
        });

        return { status: 200, contents };
    }

    // GET /admin/contents/:id
    async get(request: Request, response: Response, next: NextFunction) {
        const id = Number(request.params.id);
        const content = await prisma.content.findUnique({
            where: { id },
            include: { listItems: { orderBy: { order: "asc" } } },
        });

        if (!content) {
            return { status: 404, error: "Not found" };
        }
        return { status: 200, content };
    }

    // POST /admin/contents
    async create(request: Request, response: Response, next: NextFunction) {
        const data = toContentData(request.body ?? {});
        const listItems: ListItemInput[] = request.body?.listItems ?? [];

        const content = await prisma.content.create({
            data: {
                ...data,
                listItems: { create: toListItemsCreateData(listItems) },
            },
            include: { listItems: { orderBy: { order: "asc" } } },
        });

        return { status: 201, content };
    }

    // PUT /admin/contents/:id
    async update(request: Request, response: Response, next: NextFunction) {
        const id = Number(request.params.id);
        const data = toContentData(request.body ?? {});
        const listItems: ListItemInput[] = request.body?.listItems ?? [];

        // Whole-row replace for listItems: at this scale (<=15 items/list)
        // simpler and more atomic than granular per-item endpoints, and
        // matches a natural "edit the form, hit save" UX.
        const content = await prisma.$transaction(async (tx) => {
            await tx.contentListItem.deleteMany({ where: { contentId: id } });
            return tx.content.update({
                where: { id },
                data: {
                    ...data,
                    listItems: { create: toListItemsCreateData(listItems) },
                },
                include: { listItems: { orderBy: { order: "asc" } } },
            });
        });

        return { status: 200, content };
    }

    // DELETE /admin/contents/:id
    async remove(request: Request, response: Response, next: NextFunction) {
        const id = Number(request.params.id);
        await prisma.content.delete({ where: { id } });
        // Not a bare 204: the registerRoutes wrapper always sends a JSON
        // body alongside `status`, so 204 (No Content) would be a spec
        // violation here — 200 + a small body is the honest shape.
        return { status: 200, success: true };
    }
}

function toContentData(body: any) {
    return {
        dayNumber: Number(body.dayNumber ?? 0),
        type: body.type as ContentFamily,
        subType: body.subType ?? "",
        title: body.title ?? "",
        content1: body.content1 ?? "",
        content2: body.content2 ?? "",
        content3: body.content3 ?? "",
        content4: body.content4 ?? "",
        media: body.media ?? "",
        published: body.published ?? true,
        isNew: body.isNew ?? false,
    };
}

function toListItemsCreateData(listItems: ListItemInput[]) {
    return listItems.map((item, order) => ({
        order,
        title: item.title ?? "",
        description: item.description ?? "",
        author: item.author ?? "",
        image: item.image ?? "",
        url: item.url ?? "",
    }));
}
