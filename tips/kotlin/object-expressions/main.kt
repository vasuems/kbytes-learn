fun main() {
  val obj = object {
    fun greet() = println("Hello")
  }
  obj.greet()
  val obj2 = object : Any() {
    override fun toString() = "Obj2"
  }
  println(obj2)
}
