import { useState } from 'react'
import './App.css'
import CoverageResult from './components/CoverageResult';

function App() {
  const [projectPath, setProjectPath] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading]= useState(false);

  const handleRunCoverage = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/run-coverage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectPath }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to run coverage');
      }
      console.log('Coverage data:', data);
      setResults(data.files);
    } catch (error) {
      console.error('Error running coverage:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">AI TestAgent</h1>
      <input
        type="text"
        placeholder="Enter Angular project path-  c:/Repos/esp-dmgmt"
        className="border p-2 w-full mb-2"
        value={projectPath}
        onChange={(e) => setProjectPath(e.target.value)}
      />
      <button onClick={handleRunCoverage} className="bg-blue-600 text-white px-4 py-2 rounded">
        Run Coverage
      </button>
      <CoverageResult results={results} />
    </div>
  );
}

export default App;