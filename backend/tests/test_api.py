from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_analyze_endpoint_returns_metrics():
    content = b"hello world\nhello"
    response = client.post(
        "/analyze",
        files={"file": ("sample.txt", content, "text/plain")},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["word_count"] == 3
    assert data["line_count"] == 2
    assert data["most_frequent_word"] == "hello"


def test_search_endpoint_returns_positions():
    content = b"alpha beta alpha gamma"
    response = client.post(
        "/search",
        data={"query": "alpha"},
        files={"file": ("sample.txt", content, "text/plain")},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 2
    assert data["positions"] == [1, 3]
