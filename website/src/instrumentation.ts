export async function onRequestError(
  err: unknown,
  request: { path: string; method: string },
  context: { routePath: string; routeType: string },
) {
  const error = err instanceof Error ? err : new Error(String(err));
  console.error(
    "[onRequestError] UNREDACTED:",
    JSON.stringify({
      message: error.message,
      stack: error.stack,
      name: error.name,
      path: request.path,
      method: request.method,
      routePath: context.routePath,
      routeType: context.routeType,
    }),
  );
}
