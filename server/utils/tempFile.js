import crypto from "crypto";
import path from "path";
import fs from "fs";

export const createTempFile = (code, extension) => {
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const filePath = path.join(process.cwd(), "temp", fileName);

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath));
  }

  fs.writeFileSync(filePath, code);
  return filePath;
};

export const deleteTempFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
