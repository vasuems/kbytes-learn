fun main() {
  fun printMessage(msg: String) {
    println(msg)
  }
  fun higherOrderFunction(func: () -> Unit) {
    println("Before")
    func()
    println("After")
  }
  higherOrderFunction { printMessage("Hello") }
}
