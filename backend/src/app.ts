import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import cors from "cors";
import { PORT } from "./config";
import { AuthRouter } from "./routers/auth.router";
import { EventRouter } from "./routers/event.router";
import { PurchaseRouter } from "./routers/purchase.router";
import { OrganizerRouter } from "./routers/organizer.router";
import { AuthOrganizerMiddleware } from "./middlewares/authOrganizer.middleware";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use("/favicon.ico", express.static("/images/favicon.ico"));
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
        res.status(404).send("Not found !");
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes("/api/")) {
          console.error("Error : ", err.stack);
          res.status(500).send("Error !");
        } else {
          next();
        }
      }
    );
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.redirect("/api/");
    });
    this.app.get("/api", (req: Request, res: Response) => {
      res.send(`Hello, this is Mini Project API!`);
    });

    // this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use("/api/auth", new AuthRouter().getRouter());
    this.app.use("/api/event", new EventRouter().getRouter());
    this.app.use(
      "/api/organizer",
      AuthMiddleware,
      AuthOrganizerMiddleware,
      new OrganizerRouter().getRouter()
    );
    this.app.use(
      "/api/purchase",
      AuthMiddleware,
      new PurchaseRouter().getRouter()
    );
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
