def find_matching_brace(text: str, open_index: int) -> int:
    depth = 0
    for i in range(open_index, len(text)):
        c = text[i]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return i
    raise ValueError("No matching closing brace '}' found")
