import { Request } from "express";
import { PageParser } from "../core/page-parser";
import * as gearset from "../lib/lodestone-css-selectors/profile/gearset.json";
import { CssSelectorRegistry } from "../core/css-selector-registry";

export class Equipment extends PageParser {
  protected getURL(req: Request): string {
    return (
      "https://de.finalfantasyxiv.com/lodestone/character/" +
      req.params.characterId
    );
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...gearset };
  }
}
