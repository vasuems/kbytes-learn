import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
@Serializable
data class Person(val name: String, val age: Int)
fun main() {
    val person = Person("John", 30)
    val json = Json.encodeToString(person)
    println(json)
    val deserializedPerson = Json.decodeFromString(Person.serializer(), json)
    println(deserializedPerson.name)
    println(deserializedPerson.age)
}
