class Trie:
  def __init__(self):
    self.root = {}
  def insert(self, word):
    node = self.root
    for char in word:
      if char not in node:
        node[char] = {}
      node = node[char]
  def search(self, word):
    node = self.root
    for char in word:
      if char not in node:
        return False
      node = node[char]
    return True
trie = Trie()
trie.insert('cat')
print(trie.search('cat'))
print(trie.search('dog'))
