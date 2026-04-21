const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export async function analyzeFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Analyze request failed');
  return res.json();
}

export async function searchInFile(file, query) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('query', query);

  const res = await fetch(`${API_BASE_URL}/search`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Search request failed');
  return res.json();
}
