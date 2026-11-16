fn main() {
    trait Printable {
        fn print(&self);
    }
    struct Book {
        title: String,
    }
    impl Printable for Book {
        fn print(&self) {
            println!("Book: {}", self.title);
        }
    }
    let book = Book { title: String::from("Rust") };
    book.print();
}
