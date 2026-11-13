fn main() {
    fn parse_age(age: &str) -> Result<i32, &str> {
        age.parse::<i32>().map_err(|_| "Not a number")
    }
    
    let age = "twenty";
    match parse_age(age) {
        Ok(age) => println("You are {}", age),
        Err(e) => println("Error: {}", e),
    }
    
    let age = "25";
    match parse_age(age) {
        Ok(age) => println("You are {}", age),
        Err(e) => println("Error: {}", e),
    }
}
