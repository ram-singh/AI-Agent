export default function CoverageResult({ results }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg mb-2">Files with &lt; 90% Coverage</h2>
      <p>Total Files: {results.length}</p>
      <ul className="list-disc pl-5 text-left">
        {results.map((file, idx) => (
          <li key={idx}>{file.filePath} - <b>{file.coverage}%</b></li>
        ))}
      </ul>
    </div>
  );
}
