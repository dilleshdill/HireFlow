import { spawn } from "child_process";
import crypto from "crypto";
import fs from "fs";
import path from "path";


const TEMP_DIR = path.join(process.cwd(), "temp");

// Create temp folder if not exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

const createTempFile = (code, extension) => {
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const filePath = path.join(TEMP_DIR, fileName);
  fs.writeFileSync(filePath, code);
  return filePath;
};

const deleteTempFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

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





export const runAllTestCases = (language, code, input = "") => {
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

    const child = spawn(command, [filePath]);

    let output = "";
    let error = "";

    // 🔥 Timeout protection
    const timeout = setTimeout(() => {
      child.kill();
      deleteTempFile(filePath);
      reject("Time Limit Exceeded");
    }, 5000);

    child.stdout.on("data", d => output += d.toString());
    child.stderr.on("data", d => error += d.toString());

    if (input) {
      child.stdin.write(String(input) + "\n");
    }
    child.stdin.end();

    child.on("close", () => {
      clearTimeout(timeout);
      deleteTempFile(filePath);

      if (error) return reject(error.trim());
      resolve(output.trim());
    });

    child.on("error", () => {
      clearTimeout(timeout);
      deleteTempFile(filePath);
      reject("Execution failed");
    });
  });
};
