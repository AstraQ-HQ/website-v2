from pathlib import Path

for f in Path("content/blogs").glob("*.mdx"):
    for i, line in enumerate(open(f), 1):
        for j, c in enumerate(line, 1):
            if ord(c) > 127:
                print(f"{f.name}:{i}:{j} '{c}' U+{ord(c):04X}")
