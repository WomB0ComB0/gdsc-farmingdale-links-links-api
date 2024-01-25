export class LinksController {
  constructor(private readonly client: Client ) {
    Config()
  }

  private readonly links: LinksModel

  public getLinks = async (req: Request, res: Response): Promise<Response> => {
    const data = req.query
    const links = await this.links.getLinks(data)
    if (!links) {
      return res.status(404).json({ message: 'not found' })
    }
    return res.status(200).json(links)
  }

  public getLink = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.client.waitForSocketOpen()
    } catch {
      return res.status(500).json({ message: 'internal server error' })
    }
    const { id } = req.params
    const link = await this.links.getLink(id)
    if (!link) {
      return res.status(404).json({ message: 'not found' })
    }
    return res.status(200).json(link)
  }

  public createLink = async (req: Request, res: Response): Promise<Response> => {
    const data = req.body
    const link = await this.links.createLink(data)
    if (!link) {
      return res.status(500).json({ message: 'internal server error' })
    }
    return res.status(201).json(link)
  }

  public updateLink = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const data = req.body
    const link = await this.links.updateLink(id, data)
    if (!link) {
      return res.status(404).json({ message: 'not found' })
    }
    return res.status(200).json(link)
  }

  public delLink = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const link = await this.links.deleteLink(id)
    if (!link) {
      return res.status(404).json({ message: 'not found' })
    }
    return res.status(200).json(link)
  }

      private readonly getOTPFromId = async (id: number): Promise<OneTimePasswordModel | null> => {
        return await this.otp.findOne({
            where: {
                id
            }
        })
    }

    private readonly getOTPFromNumber = async (phoneNumber: number): Promise<OneTimePasswordModel | null> => {
        return await this.otp.findOne({
            where: {
                [Op.and]: [
                    { phoneNumber },
                    { isUsed: false },
                    { attempt: { [Op.lt]: this.attempts } },
                    { createdAt: { [Op.gte]: new Date(Date.now() - 60000 * this.lifetime) } }
                ]
            }
        })
    }

    private readonly createOTP = async (phoneNumber: number, otpCode: number): Promise<void> => {
        await this.otp.create({
            phoneNumber,
            otpCode,
            attempt: 0,
            isUsed: false
        })
    }

    private readonly updateOTP = async (phoneNumber: number, attempt: number, isUsed: boolean): Promise<void> => {
        await this.otp.update(
            {
                attempt,
                isUsed
            },
            {
                where: {
                    [Op.and]: [
                        { phoneNumber },
                        { isUsed: false },
                        { attempt: { [Op.lte]: this.attempts } },
                        { createdAt: { [Op.gte]: new Date(Date.now() - 60000 * 2) } }
                    ]
                }
            }
        )
    }

    private readonly deleteOTP = async (phoneNumber: number): Promise<void> => {
        await this.otp.destroy({
            where: {
                phoneNumber
            }
        })
    }
}