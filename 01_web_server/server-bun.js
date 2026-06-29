import { serve } from "bun";

serve({
    fetch(req) {
        const url = new URL(req.url)
        if (url.pathname === "/") {
            return new Response("Hello World Bun !!", { status: 200 });
        }
        else if (url.pathname === "/login") {
            return new Response("Login Bun", { status: 200 });
        }
        else {
            return new Response("404 Not Found Bun", { status: 404 });
        }
    },
    hostname: "127.0.0.1",
    port: 3000
});