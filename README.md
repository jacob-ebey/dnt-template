# dnt-template

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
