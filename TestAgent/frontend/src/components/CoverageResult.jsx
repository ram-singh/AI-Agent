export default function CoverageResult({ results }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg mb-2">Files with &lt; 90% Coverage</h2>
      <p>Total Files: {results.length}</p>
      <ul className="list-disc pl-5">
        {results.map((file, idx) => (
          <li key={idx}>{file.filePath} - {file.coverage}%</li>
        ))}
      </ul>
    </div>
  );
}
