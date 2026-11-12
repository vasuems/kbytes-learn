"""Runs a SQL tip against an empty in-memory SQLite database.

Rows from every statement that returns rows are printed like the sqlite3 shell's default
list mode: columns joined by "|", NULL printed as an empty string.
"""
import sqlite3
import sys


def cell(value):
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        return f"{value:.1f}"
    return str(value)


def main(path):
    with open(path, encoding="utf-8") as handle:
        script = handle.read()
    connection = sqlite3.connect(":memory:")
    statement = ""
    for line in script.splitlines(keepends=True):
        statement += line
        if not sqlite3.complete_statement(statement):
            continue
        cursor = connection.execute(statement)
        if cursor.description:
            for row in cursor.fetchall():
                print("|".join(cell(value) for value in row))
        statement = ""
    if statement.strip():
        raise SystemExit(f"Incomplete SQL statement at the end: {statement.strip()[:80]}")
    connection.commit()


if __name__ == "__main__":
    main(sys.argv[1])
