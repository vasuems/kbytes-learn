fn main() {
    let mut map = std::collections::HashMap::new();
    map.insert("John", 25);
    map.insert("Alice", 30);
    println!("John's age: {}", map.get("John").unwrap());
    println!("Alice's age: {}", map.get("Alice").unwrap());
}
