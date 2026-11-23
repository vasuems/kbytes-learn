fun main() {
    val addTwo = { x: Int -> x + 2 }
    val multiplyByThree = { y: Int -> y * 3 }
    val compose = { z: Int -> multiplyByThree(addTwo(z)) }
    println(compose(5))
    println(compose(10))
}
