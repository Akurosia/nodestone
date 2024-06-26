import { Request } from "express";
import { PageParser } from "../core/page-parser";
import * as character from "../lib/lodestone-css-selectors/profile/character.json";
import * as attributes from "../lib/lodestone-css-selectors/profile/attributes.json";
import { CssSelectorRegistry } from "../core/css-selector-registry";

export class Character extends PageParser {
  protected getURL(req: Request): string {
    return (
      "https://de.finalfantasyxiv.com/lodestone/character/" +
      req.params.characterId
    );
  }

  protected getCSSSelectors(): CssSelectorRegistry {
    return { ...character, ...attributes };
  }
}
