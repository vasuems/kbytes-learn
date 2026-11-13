fn main() {
    let some_value: Option<i32> = Some(10);
    let no_value: Option<i32> = None;
    println!("Some value: {:?}", some_value);
    println!("No value: {:?}", no_value);
    match some_value {
        Some(value) => println!("Value: {}", value),
        None => println!("No value found"),
    }
    match no_value {
        Some(value) => println!("Value: {}", value),
        None => println!("No value found"),
    }
}
