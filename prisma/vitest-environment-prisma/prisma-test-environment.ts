import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("Rodou");

    return {
      teardown() {},
    };
  },
  transformMode: "ssr",
};
