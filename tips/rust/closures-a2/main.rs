fn main() {
    let add_two = |x: i32| x + 2;
    let numbers = vec![4, 6];
    for number in numbers {
        println!("{}", add_two(number));
    }
}
