import { useState } from 'react';
import { analyzeFile, searchInFile } from './api';

export default function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onAnalyze = async (event) => {
    event.preventDefault();
    setError('');
    if (!file) {
      setError('Please upload a .txt file first.');
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeFile(file);
      setAnalysis(data);
      setSearchResult(null);
    } catch (e) {
      setError('Failed to analyze file.');
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async (event) => {
    event.preventDefault();
    setError('');

    if (!file) {
      setError('Upload a file before searching.');
      return;
    }

    if (!query.trim()) {
      setError('Enter a word to search.');
      return;
    }

    try {
      setLoading(true);
      const result = await searchInFile(file, query);
      setSearchResult(result);
    } catch (e) {
      setError('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Text File Analyzer</h1>

      <form onSubmit={onAnalyze} className="card">
        <label htmlFor="file">Upload .txt file</label>
        <input
          id="file"
          data-testid="file-input"
          type="file"
          accept=".txt,text/plain"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={loading}>Analyze</button>
      </form>

      {analysis && (
        <section className="card" aria-label="analysis results">
          <h2>Analysis</h2>
          <ul>
            <li>Word count: {analysis.word_count}</li>
            <li>Character count: {analysis.character_count}</li>
            <li>Line count: {analysis.line_count}</li>
            <li>Most frequent word: {analysis.most_frequent_word || '-'}</li>
            <li>Longest word: {analysis.longest_word || '-'}</li>
          </ul>
        </section>
      )}

      <form onSubmit={onSearch} className="card">
        <label htmlFor="query">Search word</label>
        <input
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a word"
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>

      {searchResult && (
        <section className="card" aria-label="search results">
          <h2>Search Results</h2>
          <p>
            "{searchResult.query}" found {searchResult.count} time(s)
          </p>
          <p>Word positions: {searchResult.positions.join(', ') || 'None'}</p>
        </section>
      )}

      {error && <p className="error">{error}</p>}
    </main>
  );
}
