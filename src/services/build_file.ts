import * as esbuild from "esbuild";
import * as fs from "fs";
import JSZip from "jszip";
import path from "path";

export const build_mjs = async (filePath: string) => {
    try {
        // Build with esbuild
        let outDir = 'dist';

        await esbuild.build({
            entryPoints: [filePath],
            bundle: true,
            outdir: outDir,
            platform: 'node',
            sourcemap: 'inline',
        });

        // Zip the output file
        let basename = path.basename(filePath);

        const zip = new JSZip();
        const fileContents = fs.readFileSync(path.join(outDir, basename), "utf-8");
        zip.file(basename, fileContents);

        // Generate the zip file and write it to disk
        let zipFile = path.join(outDir, basename.replace(/\.[^/.]+$/, ".zip"));

        const content = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
        fs.writeFileSync(zipFile, content);
        return zipFile;
    } catch (e: any) {
        console.error(e.message);
    }
};