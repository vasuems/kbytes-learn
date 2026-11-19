fun main() {
    val lazyValue: String by lazy { expensiveSetup() }
    println("Before initialization")
    println(lazyValue)
    println("After initialization")
}

fun expensiveSetup(): String {
    println("Expensive setup done")
    return "Setup result"
}
