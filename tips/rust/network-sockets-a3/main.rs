use std::net::TcpStream;
use std::io::Write;

fn main() {
    let mut stream = TcpStream::connect("localhost:8080").unwrap();
    stream.write_all(b"Hello, server!").unwrap();
    println!("Message sent");
}
