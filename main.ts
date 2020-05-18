import {
  listenAndServe,
  ServerRequest,
} from "https://deno.land/std/http/server.ts"
import { staticHtmlResponder } from "./src/staticHtmlResponder.ts"

const port = 3333

listenAndServe({ port }, async (req: ServerRequest) => {
  if (req.method === "GET" && req.url === "/") {
    req.respond(await staticHtmlResponder(Deno.open, "index.html"))
  }
})

console.log(`Server started, listening fine on port: ${port}`)
