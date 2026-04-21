export function extractWordStats(text) {
  const words = (text.match(/[A-Za-z0-9']+/g) || []);
  const lower = words.map((w) => w.toLowerCase());

  const frequency = lower.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentWord = Object.keys(frequency)
    .sort((a, b) => {
      if (frequency[b] !== frequency[a]) return frequency[b] - frequency[a];
      return a.localeCompare(b);
    })[0] || '';

  const longestWord = words.sort((a, b) => b.length - a.length)[0] || '';

  return {
    wordCount: words.length,
    characterCount: text.length,
    lineCount: text ? text.split(/\r?\n/).length : 0,
    mostFrequentWord,
    longestWord
  };
}
