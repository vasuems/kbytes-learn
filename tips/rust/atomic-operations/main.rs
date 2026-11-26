use std::sync::atomic::{AtomicUsize, Ordering);

fn main() {
    let counter = AtomicUsize::new(0);
    counter.fetch_add(1, Ordering::SeqCst);
    println!("Counter: {}", counter.load(Ordering::SeqCst));
    counter.fetch_sub(1, Ordering::SeqCst);
    println!("Counter: {}", counter.load(Ordering::SeqCst));
}
