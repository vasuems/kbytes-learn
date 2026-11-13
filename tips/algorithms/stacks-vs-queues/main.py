from collections import deque

# Stack example
stack = []
stack.append('a')
stack.append('b')
stack.append('c')
print(stack.pop())
print(stack.pop())

# Queue example
queue = deque()
queue.append('x')
queue.append('y')
queue.append('z')
print(queue.popleft())
print(queue.popleft())
