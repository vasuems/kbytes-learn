fn main() {
    type Kilometers = i32;
    let x: Kilometers = 20;
    println!("{} km", x);
    type Thunk = Box<dyn Fn() + Send + 'static>;
    let foo: Thunk = Box::new(|| println!("hi"));
    foo();
}
