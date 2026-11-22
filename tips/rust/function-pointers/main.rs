fn add(a: i32, b: i32) -> i32 { a + b }
fn multiply(a: i32, b: i32) -> i32 { a * b }
fn main() {
    let f: fn(i32, i32) -> i32 = add;
    println!("{}", f(1, 2));
    let f: fn(i32, i32) -> i32 = multiply;
    println!("{}", f(3, 4));
}
