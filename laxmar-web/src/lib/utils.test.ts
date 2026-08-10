import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("combina clases de Tailwind", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("resuelve conflictos de clases con tailwind-merge", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
