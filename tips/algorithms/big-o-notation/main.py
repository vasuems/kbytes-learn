def slow_search(names, target):
  for name in names:
    if name == target:
      return True
  return False

def fast_search(names, target):
  names_set = set(names)
  return target in names_set

print(slow_search(["John", "Mary", "David"], "Mary"))
print(fast_search(["John", "Mary", "David"], "Mary"))
