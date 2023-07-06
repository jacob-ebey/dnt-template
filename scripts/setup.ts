import Ask from "https://deno.land/x/ask@1.0.6/mod.ts";

const ask = new Ask();

const { name, username } = (await ask.prompt([
  {
    name: "username",
    type: "input",
    message: "What is your GitHub username?",
  },
  {
    name: "name",
    type: "input",
    message: "What is your project name?",
  },
])) as { name: string; username: string };

Deno.removeSync("CHANGELOG.md");

Deno.writeTextFileSync(
  ".github/workflows/release.yml",
  Deno.readTextFileSync(".github/workflows/release.yml")
    .replace(/jacob\-ebey/g, username)
    .replace(/dnt\-template/g, name)
);

Deno.writeTextFileSync(
  "README.md",
  Deno.readTextFileSync("README.md").replace(/dnt\-template/g, name)
);

Deno.writeTextFileSync(
  "package.json",
  Deno.readTextFileSync("package.json")
    .replace(/jacob\-ebey/g, username)
    .replace(/dnt\-template/g, name)
);
