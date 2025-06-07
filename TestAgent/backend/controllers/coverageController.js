const { exec } = require('child_process');
const { readCoverageReport } = require('../services/coverageService');

exports.runCoverageCheck = async (req, res) => {
  const { projectPath } = req.body;

  console.log('Running coverage check for project:', projectPath);
  if (!projectPath) return res.status(400).json({ error: 'Project path is required' });

  exec('npm run code-coverage', { cwd: projectPath }, async (err, stdout, stderr) => {
    if (err) {
      console.error(`[Coverage] ❌ Failed to run coverage: ${stderr}`);
      return res.status(500).json({ error: 'Failed to run coverage', details: stderr });
    }
    console.log('[Coverage] ✅ Coverage command executed successfully');
    try {
      const files = await readCoverageReport(`${projectPath}/coverage/coverage-summary.json`);
      console.log('\n📊 Coverage Report: Files < 90% Coverage');
      files.forEach(file => {
        console.log(`- ${file.filePath}: ${file.coverage}%`);
      });
      res.json({ files });
    } catch (e) {
      console.error('Error reading coverage report:', e);
      res.status(500).json({ error: 'Error reading coverage report', details: e.message });
    }
  });
};
