import fs from "fs";
import path from "path";

function walk(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f === "node_modules") continue;
    if (fs.statSync(p).isDirectory()) walk(p, files);
    else if (/\.(jsx|js|css)$/.test(f)) files.push(p);
  }
  return files;
}

function stripDarkTokens(text) {
  return text.replace(/className=(["'`])([\s\S]*?)\1/g, (match, quote, value) => {
    if (!value.includes("dark:")) return match;

    const cleaned = value
      .split(/\s+/)
      .filter((token) => token && !token.startsWith("dark:"))
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim();

    return `className=${quote}${cleaned}${quote}`;
  });
}

let fileCount = 0;
for (const file of walk("src")) {
  let content = fs.readFileSync(file, "utf8");
  const orig = content;
  content = stripDarkTokens(content);
  if (content !== orig) {
    fs.writeFileSync(file, content);
    fileCount++;
    console.log(file);
  }
}
console.log("Updated files:", fileCount);
