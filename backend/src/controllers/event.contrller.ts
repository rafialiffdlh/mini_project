export class EventController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.getAllService();
      return res
        .status(200)
        .json({ message: "get category Success", data, success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await CategoryService.createService(req);
      return res.status(201).json({ message: "create category Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
