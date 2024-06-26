import { PaginatedPageParser } from "../core/paginated-page-parser";
import { CssSelectorRegistry } from "../core/css-selector-registry";
import * as freeCompanySearch from "../lib/lodestone-css-selectors/search/freecompany.json";
import { Request } from "express";
import logger from "../logger/logger";

export class FreeCompanySearch extends PaginatedPageParser {
  protected getBaseURL(req: Request): string {
    logger.info(req.query);
    let query = `?q=${req.query.name}`;
    if (req.query.dc) {
      query += `&worldname=_dc_${req.query.dc}`;
    } else if (req.query.server) {
      query += `&worldname=${req.query.server}`;
    }
    return `https://de.finalfantasyxiv.com/lodestone/freecompany/${query}`;
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return freeCompanySearch;
  }
}
