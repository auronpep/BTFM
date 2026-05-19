const toolRouteOverrides: Record<string, string> = {
  "board-question-bank": "/tools/question-bank/",
  "board-red-flags": "/tools/red-flags/",
};

export function getToolHref(id: string) {
  return toolRouteOverrides[id] ?? `/tools/${id}/`;
}
