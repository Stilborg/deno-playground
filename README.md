# Stuff I learned

## Warning: this repo will be a pretty unstructured rant of me poking a stick at Deno

I want to explore how the Deno development experience is. And see if it is possible to build and deploy something with it.

I come from creating REST back ends using Node.js with typescript, so it is likely that my views and wishes might be influenced by that.

And I will check in frequently, so all my bad choices and stupid mistakes will most like be in the branch history :)

### Intellisense

Being a geezer and needing help remembering basic stuff, I need intellisense in vs code.

To get this for Deno I installed the Deno vs code plugin created by `axetroy` (it is based on the justjavac one, so no need for both)

To enable and set it up for my specific project and personal preferences, I add this to my `.vscode/settings.json`:

```json
{
  "Deno.enable": true,
  // "Deno.import_map": "./path/to/import_map.json",
  "Deno.unstable": false,
  "editor.formatOnSave": true,
  "javascript.format.semicolons": "remove",
  "typescript.format.semicolons": "remove"
}
```

It is straight out of the install instructions, so no magic there. Maybe just restart vs code.

### VS Code debugging

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
      "runtimeExecutable": "${workspaceFolder}/debug.sh",
      "outputCapture": "std",
      "port": 9229
    }
  ]
}
```

The `"outputCapture": "std",` section solved a problem with not seeing the console output.

To be able to load ENV variables, I point the runtimeExecutable to the debug.sh shell file.

I can now start the app in debug mode using the built in debugger in VS code.

### Restarting the app on save (hot reloading or watch mode)

**The code in this example is based on what @Caesar2011 did over here: https://github.com/Caesar2011/rhinoder**

There is currently no watch flag available in Deno, as it is not considered a 1.0 feature. So we will have to make our own clunky version.

Deno has a file system listener we can use for that, but we only want to listening when we are developing locally in debug mode.

Creating a debug.ts file in the root with this content:

```typescript
const delay = 500
let timeout: number | null = null
let app: Deno.Process = startProcess()

function startProcess(): Deno.Process {
  //const args: string[] = ["main.ts"]
  return Deno.run({
    cmd: ["deno", "run", "--allow-net", "--allow-read", "main.ts"],
  })
}

function runMain() {
  app && app.close()
  app = startProcess()
}

for await (const event of Deno.watchFs([
  "./static",
  "./src",
  "./test",
  "./main.ts",
  "./test.ts",
])) {
  if (event.kind !== "access") {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(runMain, delay)
  }
}
```

will allow us to start the app in watch mode using this command:

`Deno run --allow-run --allow-read watch.ts`

Notice that the watch script needs permissions to read (monitor) the filesystem and to run a command (the Deno command in this case)

#### Shortcut to run watch mode

To make it easier to use watch mode, I create a watch.sh file in the root.

```shell
#!/bin/zsh
# for local env and run parameters
Deno run --allow-run --allow-read watch.ts
```

`source watch.ts`or chmod -x the watch.sh file and run `./watch.sh`

#### Limiting watch mode to actual code files

The Jury-rigged watch mode tracks all files in the app, and documentation changes does not need to trigger a rebuild. So lets limit the watch a little.

I have no preferences for structure in Deno yet, so lets limit the watcher to `/src` `/test` and `/static` folders and a few files in root

### Hot reloading AND debugging

wayOf the things I really love about the way my Node.js / typescript setup works is the way that nodemon and the debugger works together. Projects are re-compiled and re-started on file saves, and the debugger automatically attaches to the project again.

**Unfortunately I have not been able to find a way to do this with Deno, yet.** But if anyone out there have a solution to this, please let me know.

So for now I will resort to working i watch mode and only spin up the debugger when I need to.

### Environment variables

Watch mode is initiated by the watch.sh shell script

Debug mode is initiated by the debug.sh script that is called from the vs code launch config

To be able to set environment variables locally I have added a config.sh file that is sourced by both watch and debug.

config.sh will store ENV variables needed for the app to run locally and will go into .gitignore once we start having secrets

### Deployment

### Preact?

Maybe server the app from / and create an api on /api

### An HTTP server

Not using a framework, lets just make something

#### What about TLS

Using mkcert
