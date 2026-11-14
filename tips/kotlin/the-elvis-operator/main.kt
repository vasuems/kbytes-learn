fun main() {
    var name: String? = null
    var defaultName = name ?: "Unknown"
    println(defaultName)
    name = "John"
    defaultName = name ?: "Unknown"
    println(defaultName)
}
