fun greet(name: String, message: String = "Hello") {
    println("$message, $name!")
}
fun main() {
    greet("John")
    greet("Jane", "Hi")
}
