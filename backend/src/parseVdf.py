def find_matching_brace(text: str, open_index: int) -> int:
    """
    Finds the index of the closing brace '}' that matches the opening brace '{' at a given position.

    This function tracks nested braces using a depth counter. It starts scanning from the given
    index and returns the position of the closing brace that balances the opening one.

    Args:
        text (str): The full string containing braces.
        open_index (int): The index of the opening brace '{' to match.

    Returns:
        int: The index of the matching closing brace '}'.

    Raises:
        ValueError: If no matching closing brace is found in the string.
    """
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
