fn main() {
    let s = String::from("hello");
    let t = s;
    // s is no longer valid
    println!("t: {}", t);
}
