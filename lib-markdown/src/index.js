import chalk from "chalk";
import fs from "fs";
import fetch from "node-fetch";

const path = process.argv;

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const resultsArr = [];

  let temp;

  while ((temp = regex.exec(text)) !== null) {
    resultsArr.push({
      [temp[1]]: temp[2],
    });
  }

  return resultsArr.length === 0 ? "there are no links" : resultsArr;
}

function errorTreatment(error) {
  throw new Error(chalk.red(error.code, "File not found on path"));
}

async function getFile(filePath) {
  const encoding = "utf-8";

  try {
    const text = await fs.promises.readFile(filePath, { encoding });

    return extractLinks(text);
  } catch (error) {
    errorTreatment(error);
  }
}

// function getFile(filePath) {
//   const encoding = "utf-8";

//   fs.promises
//     .readFile(filePath, { encoding })
//     .then((text) => console.log(chalk.cyan(text)))
//     .catch((error) => errorTreatment(error));
// }

// function getFile(filePath) {
//   const encoding = "utf-8";

//   fs.readFile(filePath, encoding, (error, data) => {
//     if (error) {
//       errorTreatment(error);
//     }

//     console.log(chalk.green(data));
//   });
// }

// getFile("src/files/text.md");

function handleError(error) {
  throw new Error(error.message);
}

async function checkStatus(urls = []) {
  try {
    const statusArray = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url);

        return res.status;
      })
    );

    return statusArray;
  } catch (error) {
    handleError(error);
  }
}

function generateUrlsArray(links = []) {
  return links.map((link) => Object.values(link).join());
}

async function validateUrls(links = []) {
  const urls = generateUrlsArray(links);
  const statusLinks = await checkStatus(urls);

  const results = links.map((link, index) => {
    return {
      ...link,
      status: statusLinks[index],
    };
  });

  return results;
}

async function processText(filePath) {
  const result = await getFile(filePath);

  if (path[3] === "validate") {
    console.log(chalk.yellow("Validated links: "), await validateUrls(result));
  } else {
    console.log(chalk.yellow("Links list: "), result);
  }
}

console.log(processText(path[2]));

export { extractLinks, getFile, validateUrls, generateUrlsArray, processText };
