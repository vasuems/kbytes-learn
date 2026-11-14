fun main() {
    val x = 2
    val result = when (x) {
        1 -> "one"
        2 -> "two"
        else -> "other"
    }
    println(result)
    val y = 3
    val result2 = when (y) {
        1 -> "one"
        2 -> "two"
        else -> "other"
    }
    println(result2)
}
