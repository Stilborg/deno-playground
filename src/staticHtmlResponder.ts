import { Response } from "https://deno.land/std/http/server.ts"

interface FileOpener {
  (path: string, options?: Deno.OpenOptions | undefined): Promise<Deno.File>
}

export const staticHtmlResponder = async (
  opener: FileOpener,
  filename: string
): Promise<Response> => {
  return {
    status: 200,
    headers: new Headers({ "content-type": "text/html" }),
    body: await opener(`./static/${filename}`),
  }
}
