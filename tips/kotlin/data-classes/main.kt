data class User(val name: String, val age: Int)
fun main() {
  val user1 = User("John", 30)
  val user2 = User("John", 30)
  println(user1 == user2)
  println(user1.toString())
}
