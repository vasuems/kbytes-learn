use std::sync::atomic::{AtomicUsize, Ordering};

fn main() {
    let val = AtomicUsize::new(10);
    val.store(20, Ordering::SeqCst);
    println!("Updated value: {}", val.load(Ordering::SeqCst));
}
