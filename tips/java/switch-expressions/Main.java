public class Main {
    public static void main(String[] args) {
        int dayNumber = 2;
        String day = switch (dayNumber) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            default -> "Unknown";
        };
        System.out.println(day);
    }
}
