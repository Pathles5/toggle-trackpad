import shutil
import difflib
from typing import Optional, List, Dict

def find_most_similar(detected: str, candidates: List[Dict]) -> Optional[Dict]:
    """
    Return the most similar match to the detected name using similar_strings.
    """
    best = None
    best_score = 0.0

    for candidate in candidates:
        name = candidate["name"]
        score = similar_strings(detected, name)
        if score > best_score:
            best = candidate
            best_score = score

    return best if best else None

def similar_strings(a: str, b: str) -> float:
    """
    Returns the percentage similarity between two strings using SequenceMatcher.
    """
    ratio = difflib.SequenceMatcher(None, a, b).ratio()
    return round(ratio * 100, 2)

def read_text(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()

def write_text(path: str, text: str):
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def backup_file(path: str, suffix: str = ".bak") -> str:
    backup_path = path + suffix
    shutil.copy(path, backup_path)
    return backup_path
