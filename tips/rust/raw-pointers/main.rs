fn main() {
    let x = 10;
    let raw_ptr = &x as *const i32;
    let deref = unsafe { *raw_ptr };
    println!("Value: {}", deref);
}
