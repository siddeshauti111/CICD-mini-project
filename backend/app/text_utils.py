from collections import Counter
import re

WORD_PATTERN = re.compile(r"[A-Za-z0-9']+")


def tokenize(text: str) -> list[str]:
    return [w.lower() for w in WORD_PATTERN.findall(text)]


def analyze_text(text: str) -> dict:
    words_original = WORD_PATTERN.findall(text)
    words = [w.lower() for w in words_original]
    word_count = len(words_original)
    character_count = len(text)
    line_count = len(text.splitlines()) if text else 0

    most_frequent_word = ""
    if words:
        counter = Counter(words)
        max_count = max(counter.values())
        most_frequent_word = sorted([w for w, c in counter.items() if c == max_count])[0]

    longest_word = max(words_original, key=len) if words_original else ""

    return {
        "word_count": word_count,
        "character_count": character_count,
        "line_count": line_count,
        "most_frequent_word": most_frequent_word,
        "longest_word": longest_word,
    }


def search_word(text: str, query: str) -> dict:
    query_normalized = query.strip().lower()
    if not query_normalized:
        return {"query": query, "count": 0, "positions": []}

    words = tokenize(text)
    positions = [idx for idx, w in enumerate(words, start=1) if w == query_normalized]

    return {
        "query": query,
        "count": len(positions),
        "positions": positions,
    }
