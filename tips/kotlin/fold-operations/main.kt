fun main() {
  val numbers = listOf(1, 2, 3, 4, 5)
  val sum = numbers.fold(0) { acc, i -> acc + i }
  println(sum)
  val strings = listOf("a", "b", "c")
  val result = strings.fold("") { acc, s -> acc + s }
  println(result)
}
