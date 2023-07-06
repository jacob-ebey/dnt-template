# dnt-template

## Setup

Replace github username / project name throughout files:

```sh
deno run -A scripts/setup.ts
```

Add a GitHub Actions repository secret called `NPM_TOKEN` with publishing permissions.

Go to your GitHub repository Settings > Actions > General and set `Workflow permissions` to `Read and write permissions`, as well as enabling `Allow GitHub Actions to create and approve pull requests`.

## Development

Testing in Deno can be ran in a single pass with:

```sh
deno test
```

Or in watch mode with:

```sh
deno test --watch
```

Node tests are ran with the build command:

```sh
deno task build
```

Format code with:

```sh
deno task format
```

Typecheck / lint code with:

```sh
deno task check
```

## Contributing Changes

Install CLI:

```sh
npm i -g @changesets/cli
```

Generate changeset:

```sh
npx changeset
```
