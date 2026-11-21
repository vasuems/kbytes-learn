fn main() {
    macro_rules! greet {
        () => {
            println!("Hello, world!");
        }
    }
    greet!();
    greet!();
}
