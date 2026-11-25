use std::cell::RefCell;
use std::thread;
thread_local!(static FOO: RefCell<i32> = RefCell::new(1));
fn main() {
    FOO.with(|foo| println!("main: {}", *foo.borrow()));
    let handle = thread::spawn(move || {
        FOO.with(|foo| *foo.borrow_mut() = 2);
        FOO.with(|foo| println!("thread: {}", *foo.borrow()));
    });
    handle.join().unwrap();
    FOO.with(|foo| println!("main: {}", *foo.borrow()));
}
