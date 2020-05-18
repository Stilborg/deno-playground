import {
  listenAndServe,
  ServerRequest,
  Response,
} from "https://deno.land/std/http/server.ts"

const port = 3333

// const watcher = Deno.watchFs("./")
// for await (const event of watcher) {
//   console.log(">>>> event", event)
//   // { kind: "create", paths: [ "/foo.txt" ] }
// }

listenAndServe({ port }, async (req: ServerRequest) => {
  if (req.method === "GET" && req.url === "/") {
    console.log("responding again and again and again...")
    req.respond(await staticHtmlResponse("index.html"))
  }
})

const staticHtmlResponse = async (filename: string): Promise<Response> => {
  return {
    status: 200,
    headers: new Headers({ "content-type": "text/html" }),
    body: await Deno.open(`./static/${filename}`),
  }
}

console.log(`Server started, listening fine on port: ${port}`)
