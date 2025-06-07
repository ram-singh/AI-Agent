const fs = require('fs').promises;

exports.readCoverageReport = async (filePath) => {
  const raw = await fs.readFile(filePath, 'utf-8');
  const json = JSON.parse(raw);
  const lowCoverageFiles = [];

  for (const [filePath, data] of Object.entries(json)) {
    const pct = data.lines.pct;
    if (pct < 90) {
      lowCoverageFiles.push({ filePath, coverage: pct });
    }
  }

  return lowCoverageFiles;
};
