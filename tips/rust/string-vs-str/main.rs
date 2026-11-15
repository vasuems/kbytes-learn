fn main() {
    let s = String::from("hello");
    let len = calculate_length(s);
    println!("length: {}", len);
    // s is no longer available here
    let s2 = String::from("world");
    let len2 = calculate_length_borrowed(&s2);
    println!("length: {}", len2);
    // s2 is still available here
}

fn calculate_length(s: String) -> usize {
    s.len()
}

fn calculate_length_borrowed(s: &str) -> usize {
    s.len()
}
