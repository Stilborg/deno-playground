# Stuff I learned

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
