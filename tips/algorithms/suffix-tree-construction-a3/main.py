string = 'banana'
suffixes = [
    string[i:] for i in range(len(string))
]
print(suffixes)
