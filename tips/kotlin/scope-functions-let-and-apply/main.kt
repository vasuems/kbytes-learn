fun main() {
    val person = Person()
    person.apply {
        name = "John"
        age = 30
    }
    println(person.name)
    println(person.age)
}
class Person {
    var name: String = ""
    var age: Int = 0
}
