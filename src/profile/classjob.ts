import { Request } from "express";
import { CssSelectorRegistry } from "../core/css-selector-registry";
import * as classjob from "../lib/lodestone-css-selectors/profile/classjob.json";
import { PaginatedPageParser } from "../core/paginated-page-parser";

export class ClassJob extends PaginatedPageParser {
  protected getBaseURL(req: Request): string {
    return (
      "https://de.finalfantasyxiv.com/lodestone/character/" +
      req.params.characterId +
      "/class_job"
    );
  }

  async parse(req: Request, columnsPrefix: string = ""): Promise<Object> {
    const fromSuper: any = await super.parse(req, columnsPrefix);
    delete fromSuper.Pagination;
    return fromSuper;
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return classjob;
  }
}
