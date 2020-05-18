// Debug runner that will cause itself to reload whenever the filesystem changes
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

for await (const event of Deno.watchFs(".")) {
  if (event.kind !== "access") {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(runMain, delay)
  }
}
