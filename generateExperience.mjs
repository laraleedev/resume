import * as fs from "node:fs";
import {fileURLToPath} from "url";
import {dirname} from "path";

const jsonExp = JSON.parse(fs.readFileSync("./experience.json"));

/********************************************************
 * Helpers
 ********************************************************/
function commentBlock(logger, name) {
    commentLine(logger);
    logger.write(`%    ${name}\n`);
    commentLine(logger);
}

function commentLine(logger) {
    logger.write(`%-------------------------------------------------------------------------------\n`);
}

function commonHeader(logger) {
    commentBlock(logger, "SECTION TITLE")
    latexCommand(logger, "cvsection", "Work Experience");
    commentBlock(logger, "CONTENT");
    latexCommand(logger, "begin", "cventries");
}

function commonFooter(logger) {
    commentLine(logger);
    latexCommand(logger, "end", "cventries");
}

// Generates a \latex{thing}
function latexCommand(logger, name, content) {
    logger.write(`\\${name}` + (content ? `{${content}}` : "") + `\n`);
}

function writeCvEntry(logger, cventry, abbreviated) {
    commentLine(logger);
    latexCommand(logger, "cventry");
    logger.write(`{${cventry.job}} % Job title\n`);
    logger.write(`{${cventry.org}} % Organization\n`);
    logger.write(`{${cventry.location}} % Location\n`);
    logger.write(`{${cventry.date}} % Date(s)\n`);


    if (abbreviated && cventry.exclude) {
        logger.write(`{}\n\n`);
    } else {
        logger.write(`{\n`);
        latexCommand(logger, "begin", "cvitems");
        // logger.write(`\\item[] {${cventry.cvitems.header}}\n`);
        // logger.write(`\\item[]\n`);

        for (let index = 0; index < cventry.cvitems.items.length; index++) {
            logger.write(`\\item {${cventry.cvitems.items[index]}}\n`);
        }

        latexCommand(logger, "end", "cvitems");
        logger.write(`}\n\n`);
    }
}

/********************************************************
 * Full Exp Output
 ********************************************************/
var full = fs.createWriteStream("resume/_FULL-experience.tex", {});

commonHeader(full);

for (let index = 0; index < jsonExp.length; index++) {
    writeCvEntry(full, jsonExp[index]);
}

commonFooter(full);
full.end();

/********************************************************
 * Abbreviated Exp Output
 ********************************************************/
var abbreviated = fs.createWriteStream("resume/experience.tex", {});

commonHeader(abbreviated);

for (let index = 0; index < jsonExp.length; index++) {
    writeCvEntry(abbreviated, jsonExp[index], true);
}

commonFooter(abbreviated);
abbreviated.end();