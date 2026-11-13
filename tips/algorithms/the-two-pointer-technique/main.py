def find_pairs():
  numbers = [1, 2, 3, 4, 5]
  target = 7
  left = 0
  right = len(numbers) - 1
  while left < right:
    total = numbers[left] + numbers[right]
    if total == target:
      return numbers[left], numbers[right]
    elif total < target:
      left += 1
    else:
      right -= 1
  return None
print(find_pairs())
