export default {
  async fetch(request, env, ctx) {
    // This will be handled by Workers Sites automatically
    // The static files from 'out' folder will be served
    return new Response("Loading...", {
      headers: { "Content-Type": "text/html" },
    });
  },
};
