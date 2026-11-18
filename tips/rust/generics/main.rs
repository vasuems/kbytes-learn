fn main() {
    println!("max of 1 and 2: {}", max(1, 2));
    println!("max of 1.0 and 2.0: {}", max(1.0, 2.0));
}

fn max<T: PartialOrd>(a: T, b: T) -> T {
    if a > b {
        a
    } else {
        b
    }
}
