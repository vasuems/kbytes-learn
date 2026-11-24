use std::path::Path;

fn main() {
    let path = Path::new("/home/user/Downloads/file.txt");
    let file_name = path.file_name().unwrap();
    let parent = path.parent().unwrap();
    println!("File name: {}", file_name);
    println!("Parent directory: {}", parent.display());
}
