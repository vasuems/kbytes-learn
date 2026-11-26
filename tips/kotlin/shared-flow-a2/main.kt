import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val sharedFlow = MutableSharedFlow<Int>()
    launch { 
        for (i in 1..5) {
            sharedFlow.emit(i)
            delay(100)
        }
    }
    launch {
        sharedFlow.collect { value -> println(value) }
    }
    delay(1000)
}
