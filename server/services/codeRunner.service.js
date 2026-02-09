import { spawn } from "child_process";
import { createTempFile, deleteTempFile } from "../utils/tempFile.js";

export const runCode = (language, code, input = "") => {

  return new Promise((resolve, reject) => {
    let command, extension;

    if (language === "python") {
      command = "python";
      extension = "py";
    } else if (language === "javascript") {
      command = "node";
      extension = "js";
    } else {
      return reject("Unsupported language");
    }

    const filePath = createTempFile(code, extension);

    const child = spawn(command, [filePath], {
      timeout: 5000
    });
    
    let output = "";
    let error = "";

    child.stdout.on("data", d => output += d.toString());
    child.stderr.on("data", d => error += d.toString());

    if (input) {
      child.stdin.write(input);
      child.stdin.end();
    }

    child.on("close", () => {
      deleteTempFile(filePath);

      if (error) return reject(
        console.log("error",error.trim()),
        error.trim());
      resolve(output.trim());
    });
  });
};
