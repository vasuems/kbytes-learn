class Node:
  def __init__(self, data):
    self.data = data
    self.next = None
node1 = Node('song1')
node2 = Node('song2')
node1.next = node2
print(node1.data)
print(node1.next.data)
