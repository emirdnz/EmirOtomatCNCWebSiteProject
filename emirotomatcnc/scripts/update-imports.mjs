import fs from "fs";
import path from "path";

function walk(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f === "node_modules" || f === "scripts") continue;
    if (fs.statSync(p).isDirectory()) walk(p, files);
    else if (/\.(jsx|js)$/.test(f)) files.push(p);
  }
  return files;
}

const replacements = [
  [/from ["']\.\.\/container\//g, 'from "@/layouts/'],
  [/from ["']\.\.\/\.\.\/container\//g, 'from "@/layouts/'],
  [/from ["']\.\/container\//g, 'from "@/layouts/'],
  [/from ["']\.\.\/components\/Header["']/g, 'from "@/components/layout/Header"'],
  [/from ["']\.\.\/components\/Footer["']/g, 'from "@/components/layout/Footer"'],
  [/from ["']\.\/components\/Header["']/g, 'from "@/components/layout/Header"'],
  [/from ["']\.\/components\/Footer["']/g, 'from "@/components/layout/Footer"'],
  [/from ["']\.\.\/components\/TitleComponent["']/g, 'from "@/components/common/TitleComponent"'],
  [/from ["']\.\.\/\.\.\/components\/TitleComponent["']/g, 'from "@/components/common/TitleComponent"'],
  [/from ["']\.\/components\/TitleComponent["']/g, 'from "@/components/common/TitleComponent"'],
  [/from ["']\.\.\/components\/ScrollToTop["']/g, 'from "@/components/common/ScrollToTop"'],
  [/from ["']\.\/components\/ScrollToTop["']/g, 'from "@/components/common/ScrollToTop"'],
  [/from ["']\.\.\/pages\/homepage\/Homepage["']/g, 'from "@/pages/Homepage"'],
  [/from ["']\.\/pages\/homepage\/Homepage["']/g, 'from "@/pages/Homepage"'],
  [/from ["']\.\.\/pages\/about\/About["']/g, 'from "@/pages/About"'],
  [/from ["']\.\/pages\/about\/About["']/g, 'from "@/pages/About"'],
  [/from ["']\.\.\/pages\/ourworks\/OurWorks["']/g, 'from "@/pages/OurWorks"'],
  [/from ["']\.\/pages\/ourworks\/OurWorks["']/g, 'from "@/pages/OurWorks"'],
  [/from ["']\.\.\/config\//g, 'from "@/config/'],
  [/from ["']\.\/config\//g, 'from "@/config/'],
  [/from ["']\.\.\/components\//g, 'from "@/components/'],
  [/from ["']\.\.\/\.\.\/components\//g, 'from "@/components/'],
  [/from ["']\.\.\/assets\//g, 'from "@/assets/'],
  [/from ["']\.\.\/\.\.\/assets\//g, 'from "@/assets/'],
  [/from ["']\.\.\/styles\//g, 'from "@/styles/'],
  [/from ["']\.\.\/\.\.\/styles\//g, 'from "@/styles/'],
  [/from ["']\.\.\/layouts\//g, 'from "@/layouts/'],
  [/from ["']\.\.\/\.\.\/layouts\//g, 'from "@/layouts/'],
  [/from ["']\.\.\/\.\.\/public\/logo2?\.png["']/g, 'from "/logo.png"'],
  [/import ["']\.\/i18n["']/g, 'import "@/i18n"'],
  [/import ["']\.\/App\.css["']/g, 'import "@/App.css"'],
  [/import ["']\.\/styles\//g, 'import "@/styles/'],
  [/import ["']\.\/index\.css["']/g, 'import "@/index.css"'],
  [/from ["']\.\/App\.jsx["']/g, 'from "@/App.jsx"'],
];

for (const file of walk("src")) {
  let content = fs.readFileSync(file, "utf8");
  const orig = content;
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  if (content !== orig) {
    fs.writeFileSync(file, content);
    console.log("updated:", file);
  }
}
