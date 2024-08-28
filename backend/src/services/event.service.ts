import { Request } from "express";
export class EventService {
  static async getService(req: Request) {
    const { id } = req.params;
    if (id) {
    } else {
    }
    return null;
  }
  static async createService(req: Request) {
    const { id } = req.params;
    if (id && (await this.checkAuthorization(req.headers.authorization))) {
    } else {
    }
    return null;
  }
  static async updateService(req: Request) {
    const { id } = req.params;
    if (id && (await this.checkAuthorization(req.headers.authorization))) {
    } else {
    }
    return null;
  }
  static async deleteService(req: Request) {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (id && (await this.checkAuthorization(req.headers.authorization))) {
    } else {
    }
    return null;
  }
  static async deactivateService(req: Request) {
    const { id } = req.params;

    if (id && (await this.checkAuthorization(req.headers.authorization))) {
    } else {
    }
    return null;
  }

  private static async checkAuthorization(authorization?: string) {
    let isAuthorized = false;
    if (authorization) {
    }
    return isAuthorized;
  }
}
