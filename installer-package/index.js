#!/usr/bin/env node

const fs = require("fs");
const path = require("path")
const fsExtra = require("fs-extra")
const tmp = require("tmp");
const fetch = require("node-fetch");
const AdmZip = require("adm-zip");
const util = require("util");
const childP = require('child_process')

const streamPipeline = util.promisify(require("stream").pipeline);

function handleUrl(endpoint, params = {}) {
  const url = new URL(endpoint);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );
  return url;
}

async function download(endpoint, params) {
  const url = handleUrl(endpoint, params);
  const tmpZipFile = tmp.tmpNameSync();
  const response = await fetch(url.href);
  await streamPipeline(response.body, fs.createWriteStream(tmpZipFile));
  return tmpZipFile;
}

function getPackage(p) {
  const pathToPkg = path.join(p, 'package.json')
  return JSON.parse(fs.readFileSync(pathToPkg, 'utf-8'))
}

function installDeps(pkg) {
  const lst = Object.entries(pkg.dependencies)
  if (lst.length) {
    console.log(`Installing deps: ${lst.map(l => l[0]).join(',')}`)
    const versionDeps = lst.map(([lib, version]) => `${lib}@"${version}"`)
    childP.execSync(`npm install --save ${versionDeps.join(" ")}`)
  }
}

const gitPath = 'hypervillain/poc-virality'
const gitReadme = `https://github.com/${gitPath}`

async function main() {
  const zipFile = await download(`https://codeload.github.com/${gitPath}/zip/master`);
  const zip = new AdmZip(zipFile);
  const tmpath = tmp.tmpNameSync();
  zip.extractAllTo(tmpath);

  const projectPath = path.join(tmpath, `${gitPath.split('/')[1]}-master`);

  const pkg = getPackage(projectPath);
  fsExtra.moveSync(path.join(projectPath, 'src'), path.join(process.cwd(), pkg.name));

  installDeps(pkg)

  console.log(`${pkg.name} installed! Check ${gitReadme} for full install process!`)
}

main()