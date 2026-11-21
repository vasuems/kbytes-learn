trait Shape { fn area(&self); }
struct Circle;
struct Rectangle;
impl Shape for Circle { fn area(&self) { println!("Circle area"); } }
impl Shape for Rectangle { fn area(&self) { println!("Rectangle area"); } }
fn main() {
    let c = Circle;
    let r = Rectangle;
    let shapes: [Box<dyn Shape>; 2] = [Box::new(c), Box::new(r)];
    for s in shapes {
        s.area();
    }
}
