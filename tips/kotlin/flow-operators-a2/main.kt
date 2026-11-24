import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() {
    runBlocking {
        flow {
            emit(1)
            emit(2)
            emit(3)
        }
        .filter { it % 2 == 0 }
        .collect { println(it) }
    }
}
