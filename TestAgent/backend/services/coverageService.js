const fs = require('fs').promises;
const path = require('path');

exports.readCoverageReport = async (filePath) => {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(raw);
    const lowCoverageFiles = [];

    for (const [filePath, data] of Object.entries(json)) {
      // Use statement coverage percentage
      const total = Object.keys(data.statementMap || {}).length;
      const covered = Object.values(data.s || {}).filter(count => count > 0).length;
      const pct = total === 0 ? 100 : (covered / total) * 100;

      console.log(`File: ${filePath}, Coverage: ${pct.toFixed(2)}%`);
      if (pct < 90) {
        lowCoverageFiles.push({
          filePath: path.normalize(filePath),
          coverage: parseFloat(pct.toFixed(2)),
        });
      }
    }

    return lowCoverageFiles;
  } catch (err) {
    console.error('❌ Error parsing coverage-final.json:', err.message);
    throw err;
  }
};
