import { Request } from "express";
import { CssSelectorRegistry } from "../core/css-selector-registry";
import * as minions from '../lib/lodestone-css-selectors/profile/minion.json';
import { PaginatedPageParser } from "../core/paginated-page-parser";

export class Minions extends PaginatedPageParser {
  protected getBaseURL(req: Request): string {
    return (
      "https://de.finalfantasyxiv.com/lodestone/character/" +
      req.params.characterId +
      "/minion"
    );
  }

  async parse(req: Request, columnsPrefix: string = ""): Promise<Object> {
    const fromSuper: any = await super.parse(req, columnsPrefix);
    delete fromSuper.Pagination;
    delete fromSuper.Total;
    return fromSuper;
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return minions;
  }
}
