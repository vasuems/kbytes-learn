import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() {
    runBlocking {
        flow {
            for (i in 1..5) {
                emit(i)
            }
        }
        .take(3)
        .collect { value -> 
            println(value)
        }
    }
}
