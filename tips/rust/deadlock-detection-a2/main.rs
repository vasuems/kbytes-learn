use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    let handle = thread::spawn(move || {
        tx.send(1).unwrap();
    });
    let _ = rx.recv().unwrap();
    handle.join().unwrap();
    println!("No deadlock detected");
}
