import { DEV } from "@shared/config/env.config";

export class FakerFacade {
  public static async getFaker() {
    if (DEV) {
      return import("@faker-js/faker/locale/es_MX");
    }
    throw new Error("DEV mode is disabled");
  }
}
