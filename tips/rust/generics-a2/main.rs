fn main() {
    let numbers = vec![1, 2, 3];
    let strings = vec!["a", "b", "c"];
    println!("Numbers: {:?}", numbers);
    println!("Strings: {:?}", strings);
    print_type(&numbers);
    print_type(&strings);
}

fn print_type<T>(vec: &Vec<T>) {
    println!("Type: {:?}", vec);
}
