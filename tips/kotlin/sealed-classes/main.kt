sealed class TrafficLight
{
    class Red: TrafficLight()
    class Yellow: TrafficLight()
    class Green: TrafficLight()
}
fun main()
{
    val light = TrafficLight.Green()
    when (light)
    {
        is TrafficLight.Red -> println("Stop")
        is TrafficLight.Yellow -> println("Caution")
        is TrafficLight.Green -> println("Go")
    }
}
