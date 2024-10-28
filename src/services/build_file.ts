import * as esbuild from "esbuild";
import * as fs from "fs";
import * as JSZip from "jszip";

const build_mjs = async (filePath) => {
  let outDir = 'pkg'
  // Build with esbuild
  await esbuild.build({
    entryPoints: [filePath],
    outfile: "pkg/index.mjs",
    bundle: true,
    platform: "neutral",
    format: "esm",
    target: "es2022",
    sourcemap: false,
    minify: false,
  });

  // Zip the output file
  const zip = new JSZip();
  const fileContents = fs.readFileSync("pkg/index.mjs", "utf-8");
  zip.file("index.mjs", fileContents); // Add the output file to the zip

  // Generate the zip file and write it to disk
  const content = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync("pkg/index.zip", content);
  return "pkg/index.zip"
};



export { build_mjs }