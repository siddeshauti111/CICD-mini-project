import { render, screen } from '@testing-library/react';
import App from './App';
import { extractWordStats } from './textUtils';

describe('App rendering', () => {
  test('renders core UI elements', () => {
    render(<App />);

    expect(screen.getByText(/Text File Analyzer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload .txt file/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Search word/i)).toBeInTheDocument();
  });
});

describe('Text processing logic', () => {
  test('calculates common text stats', () => {
    const stats = extractWordStats('hello world\nhello');

    expect(stats.wordCount).toBe(3);
    expect(stats.lineCount).toBe(2);
    expect(stats.mostFrequentWord).toBe('hello');
    expect(stats.longestWord).toBe('hello');
  });
});
