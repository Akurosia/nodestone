import { Request } from "express";
import { CssSelectorRegistry } from "../core/css-selector-registry";
import * as achievements from '../lib/lodestone-css-selectors/profile/achievements.json';
import { PaginatedPageParser } from "../core/paginated-page-parser";

export class Achievements extends PaginatedPageParser {
  protected getBaseURL(req: Request): string {
    return "https://de.finalfantasyxiv.com/lodestone/character/" + req.params.characterId + "/achievement";
  }
  
  async parse(req: Request, columnsPrefix: string = ''): Promise<Object> {
    const fromSuper: any = await super.parse(req, columnsPrefix);
    fromSuper.Pagination.ResultsTotal = +fromSuper.TotalAchievements;
    fromSuper.Pagination.ResultsPerPage = Math.ceil(+fromSuper.TotalAchievements / fromSuper.Pagination.PageTotal);
    delete fromSuper.TotalAchievements;
    return fromSuper;
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return achievements;
  }
}
