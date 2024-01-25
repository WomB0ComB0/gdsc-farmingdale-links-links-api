export class LinksRouter {
  constructor(private readonly client: Client) {
    this.router = express.Router();
    this.routes();
  }

  public router: Router
  private readonly links: 
}