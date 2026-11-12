public class Main {
    public record Person(String name, int age) {}
    public static void main(String[] args) {
        Person person = new Person("Alice", 30);
        System.out.println(person);
        System.out.println(person.name());
        System.out.println(person.age());
    }
}
