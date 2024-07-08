import { ReportModel } from "../models/Report";
import { TokenController } from "./Tokens";
import { AdController } from "./Ads";
import { ServiceContainer } from "../services/ServicesContainer";

export class ReportController {
  private _reports: ReadonlyArray<Readonly<ReportModel>> = [];
  private _tokenIstance: TokenController;
  private _adIstance: AdController;

  constructor() {
    this._reports = [];
    this._tokenIstance = ServiceContainer.getTokenController();
    this._adIstance = ServiceContainer.getAdController();
  }

  public createReport(token: number, adReferenceKey: number, title: string, desciption: string): number {
    const userReference = this._tokenIstance.findReferenceByToken(token);
    const adReference = this._adIstance.findAdByKey(adReferenceKey);
    const isUserOwner: boolean = userReference!.userPrimaryKey === adReference!.userReferenceKey;
    if (isUserOwner === false) {
      throw new Error("Ad not found");
    }
    const createReport = new ReportModel(userReference!.userPrimaryKey, adReference!.primaryKey, title, desciption);
    this._reports = [...this._reports, createReport];
    return createReport.primaryKey;
  }

  public closeReport(token: number, reportReferenceKey: number): void {
    const userReference = this._tokenIstance.findReferenceByToken(token);
    const reportReference = this.findReferenceByReport(reportReferenceKey);
    const isUserOwner: boolean = userReference!.userPrimaryKey === reportReference!.userReferenceKey;
    if (isUserOwner === false) {
      throw new Error("Report not found");
    }

    this._reports = this._reports.map((report) => {
      if (report.primaryKey === reportReference!.primaryKey) {
        return { ...report, closed: true };
      }
      return report;
    });
  }

  public findReferenceByReport(reportReferenceKey: number) {
    const report = this._reports.find((report) => report.primaryKey === reportReferenceKey);
    if (!report) {
      throw new Error("Invalid Referece");
    }
    return report;
  }

  get reports() {
    return this._reports;
  }
}
