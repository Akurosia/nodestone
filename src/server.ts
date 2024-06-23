import express from "express";
import logger from './logger/logger';
import pinoHttp from 'pino-http';
import { Character } from "./profile/character";
import { Equipment } from "./profile/equipment";
import { Achievements } from "./profile/achievements";
import { ClassJob } from "./profile/classjob";
import { Minions } from './profile/minions';
import { Mounts } from './profile/mounts';
import { FreeCompany } from "./freecompany/freecompany";
import { FCMembers } from "./freecompany/members";
import { CharacterSearch } from "./search/character-search";
import { FreeCompanySearch } from "./search/freecompany-search";

const app = express();

const httpLogger = pinoHttp({ logger });
app.use(httpLogger);

const characterParser = new Character();
const equipmentParser = new Equipment();
const achievementsParser = new Achievements();
const classJobParser = new ClassJob();
const minionsParser = new Minions();
const mountsParser = new Mounts();
const freeCompanyParser = new FreeCompany();
const freeCompanyMemberParser = new FCMembers();
const characterSearch = new CharacterSearch();
const freecompanySearch = new FreeCompanySearch();

app.get("/Character/Search", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  try {
    const parsed = await characterSearch.parse(req);
    return res.status(200).send(parsed);
  } catch (err: any) {
    return res.status(500).send(err);
  }
});

app.get("/FreeCompany/Search", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  try {
    const parsed = await freecompanySearch.parse(req);
    return res.status(200).send(parsed);
  } catch (err: any) {
    return res.status(500).send(err);
  }
});

app.get("/Character/:characterId", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if ((req.query["columns"] as string)?.indexOf("Bio") > -1) {
    res.set("Cache-Control", "max-age=3600");
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  try {
    const character = await characterParser.parse(req, "Character.");
    const equipment = await equipmentParser.parse(req, "Character.");

    const additionalData = Array.isArray(req.query.data) ? req.query.data : [req.query.data].filter((d) => !!d);
    let achievements = additionalData.includes("AC") ? await achievementsParser.parse(req, "Achievements.") : undefined;
    let classjobs = additionalData.includes("CJ") ? await classJobParser.parse(req, "ClassJobs.") : undefined;
    let minions = additionalData.includes("MI") || additionalData.includes("MIMO") || additionalData.includes("MOMI") ? await minionsParser.parse(req, "Minions.") : undefined;
    let mounts = additionalData.includes("MO") || additionalData.includes("MIMO") || additionalData.includes("MOMI") ? await mountsParser.parse(req, "Mounts.") : undefined;

    const parsed: any = {
      Character: {
        ID: +req.params.characterId,
        ...character,
        Equipment: {...equipment},
        ClassJobs: {...classjobs},
      },
      Achievements: {...achievements},
      ...mounts,
      ...minions,
    };
    delete parsed.Character.ClassjobIcons;
    return res.status(200).send(parsed);
  } catch (err: any) {
    if (err.message === "404") {
      return res.sendStatus(404);
    }
    return res.status(500).send(err);
  }
});

app.get("/FreeCompany/:fcId", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  try {
    const freeCompany = await freeCompanyParser.parse(req, "FreeCompany.");
    const parsed: any = {
      FreeCompany: {
        ID: +req.params.fcId,
        ...freeCompany,
      },
    };
    const additionalData = Array.isArray(req.query.data)
      ? req.query.data
      : [req.query.data].filter((d) => !!d);
    if (additionalData.includes("FCM")) {
      parsed.FreeCompanyMembers = await freeCompanyMemberParser.parse(
        req,
        "FreeCompanyMembers."
      );
    }
    return res.status(200).send(parsed);
  } catch (err: any) {
    if (err.message === "404") {
      return res.sendStatus(404);
    }
    return res.status(500).send(err);
  }
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
