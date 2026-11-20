class ListNode:
    def __init__(self, data):
        self.data = data
        self.next = None

def print_list(node):
    while node is not None:
        print(node.data, end=' ')
        node = node.next
    print()
# Before: Simple list
before = [1, 2, 3]
print(before)
# After: Linked list
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
print_list(head)
