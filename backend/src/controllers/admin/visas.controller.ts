export async function reviewVisa(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for review an employee's visa document");
  try {
    if (!req.body) {
      throw new HttpBadRequestError("EMPTY_REQUEST_BODY");
    }

    // review
    await reviewVisaService(req.body);

    // updated boarding application list
    const { data: all } = await listAllBoardingService();
    const { data: progress } = await listAllBoardingService(true);
    res.status(200).json({
      success: true,
      message: "You've reivewed the visa document",
      data: { all, progress },
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllVisas(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for all employee's visa");
  try {
    const { message, data } = await listVisaStatusService();
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProgressVisas(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for all inpogress employee's visa");
  try {
    const { message, data } = await listVisaStatusService(true);
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}
