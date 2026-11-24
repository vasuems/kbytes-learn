fn main() {
    println!("Using Cargo to manage dependencies");
    let dependencies = ["rand", "serde"];
    for dependency in dependencies {
        println!("Added {} to project", dependency);
    }
}
