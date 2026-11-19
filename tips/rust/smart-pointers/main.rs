fn main() {
    let b = Box::new(5);
    println!("Box value: {}", b);
    let c = *b;
    println!("Unboxed value: {}", c);
}
