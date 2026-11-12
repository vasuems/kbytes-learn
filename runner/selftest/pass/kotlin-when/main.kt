fun label(n: Int) = when {
    n < 0 -> "negative"
    n == 0 -> "zero"
    else -> "positive"
}

fun main() {
    listOf(-2, 0, 5).forEach { println(label(it)) }
}
