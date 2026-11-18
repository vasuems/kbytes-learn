students = [('Alice', 90), ('Bob', 80), ('Charlie', 90)]
students.sort(key=lambda x: (x[1], x[0]))
print(students)
