# Stuff I learned

## Intellisense

Being a geezer and needing help remembering basic stuff, I need intellisense in vs code.

To get this for deno I installed the deno vs code plugin created by `axetroy` (it is based on the justjavac one, so no need for both)

To enable and set it up for my specific I added this to my `.vscode/settings.json`:

```json
{
  "deno.enable": true,
  // "deno.import_map": "./path/to/import_map.json",
  "deno.unstable": false,
  "[typescript]": {
    "editor.defaultFormatter": "axetroy.vscode-deno"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "axetroy.vscode-deno"
  }
}
```

It is straight out of the install instructions, so no magic there.

## VS Code debugging

To be able to debug in VS code I use this `launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Deno",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect-brk", "-A", "main.ts"],
      "outputCapture": "std",
      "port": 9229
    }
  ]
}
```

The `"outputCapture": "std",` section solved my problem with not seeing the console output.
