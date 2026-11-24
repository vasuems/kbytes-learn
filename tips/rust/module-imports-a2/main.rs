fn main() {
    mod my_module {
        pub fn add(a: i32, b: i32) -> i32 {
            a + b
        }
    }
    println!("{}", my_module::add(2, 3));
}
