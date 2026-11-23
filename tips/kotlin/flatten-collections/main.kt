fun main() {
    val nestedList = listOf(listOf(1, 2), listOf(3, 4))
    val flatList = nestedList.flatten()
    println(flatList)
}
