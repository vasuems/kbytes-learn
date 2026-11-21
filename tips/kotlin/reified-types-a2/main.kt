inline fun <reified T> getType(): String {
  return T::class.java.simpleName
}
fun main() {
  println(getType<String>())
  println(getType<Int>())
}
