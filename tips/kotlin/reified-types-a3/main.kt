inline fun <reified T> checkType(obj: Any): Boolean {
    return obj is T
}
fun main() {
    println(checkType<String>("hello"))
    println(checkType<Int>("hello"))
}
