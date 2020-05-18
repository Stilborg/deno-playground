# Stuff I learned

## Intellisense

Being a geezer and needing help remembering basic stuff, I need intellisense in vs code.

To get this for deno I installed the deno vs code plugin created by `axetroy` (it is based on the justjavac one, so no need for both)

To enable and set it up for my specific project and personal preferences, I add this to my `.vscode/settings.json`:

```json
{
  "deno.enable": true,
  // "deno.import_map": "./path/to/import_map.json",
  "deno.unstable": false,
  "editor.formatOnSave": true,
  "javascript.format.semicolons": "remove",
  "typescript.format.semicolons": "remove"
}
```

It is straight out of the install instructions, so no magic there. Maybe just restart vs code.

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
      "runtimeArgs": [
        "run",
        "--inspect-brk",
        "--allow-net",
        "--allow-read=./static",
        "main.ts"
      ],
      "outputCapture": "std",
      "port": 9229
    }
  ]
}
```

The `"outputCapture": "std",` section solved my problem with not seeing the console output.

I now have my permissions directly in the launch file, but that will might change later.

## Restarting the debugger on save

There is currently no watch flag on deno, as it is not considered a 1.0 feature. So we will have to make our own clunky version.

Deno has a file system listener we can use for that, but we only want to listening when we are developing locally in debug mode.

Creating a debug specific runner with correct permissions must be the goal.
