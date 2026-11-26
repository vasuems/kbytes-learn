import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() {
    val scope = CoroutineScope(Dispatchers.Default)
    val sharedFlow = MutableSharedFlow<Int>()
    
    scope.launch {
        sharedFlow.collect { value -> println("Collector 1: $value") }
    }
    scope.launch {
        sharedFlow.collect { value -> println("Collector 2: $value") }
    }
    
    scope.launch {
        sharedFlow.emit(1)
        sharedFlow.emit(2)
    }
}
