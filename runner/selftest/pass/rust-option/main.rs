fn first_even(numbers: &[i32]) -> Option<i32> {
    numbers.iter().copied().find(|n| n % 2 == 0)
}

fn main() {
    println!("{:?}", first_even(&[1, 3, 4, 6]));
    println!("{:?}", first_even(&[1, 3]));
}
