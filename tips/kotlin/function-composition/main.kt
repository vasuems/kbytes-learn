fun main() {

    val lengthOf = { str: String -> str.length }
    val square = { num: Int -> num * num }

    val composed = { str: String -> square(lengthOf(str)) }

    println(composed("Hello"))
    println(composed("Kotlin"))

}
