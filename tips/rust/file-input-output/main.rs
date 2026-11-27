use std::fs::File;
use std::io::Write;
use std::io::Read;

fn main() {
    let mut file = File::create("example.txt").unwrap();
    file.write_all(b"Hello, world!").unwrap();
    let mut file = File::open("example.txt").unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    println!("{}", contents);
}
