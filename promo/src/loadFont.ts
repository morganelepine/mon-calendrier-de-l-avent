import { continueRender, delayRender, staticFile } from "remotion";

export const loadFont = (family: string, path: string): string => {
    const handle = delayRender(`Loading font ${family}`);
    const face = new FontFace(family, `url("${staticFile(path)}")`);
    face.load()
        .then(() => {
            document.fonts.add(face);
            continueRender(handle);
        })
        .catch((err) => {
            console.error(err);
            continueRender(handle);
        });
    return family;
};
