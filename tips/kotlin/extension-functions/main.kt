fun String.toTitleCase(): String {
    return this.split(' ')
        .map { it.capitalize() }
        .joinToString(" ")
}
fun main() {
    println("hello world".toTitleCase())
    println("kotlin is fun".toTitleCase())
}
