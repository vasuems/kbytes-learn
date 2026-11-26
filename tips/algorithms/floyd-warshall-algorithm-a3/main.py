def floyd_warshall(graph):
  n = len(graph)
  for k in range(n):
    for i in range(n):
      for j in range(n):
        graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j])
  return graph

g = [[0, 5, float('inf'), 10],
     [float('inf'), 0, 3, float('inf')],
     [float('inf'), float('inf'), 0, 1],
     [float('inf'), float('inf'), float('inf'), 0]]
print(floyd_warshall(g))
