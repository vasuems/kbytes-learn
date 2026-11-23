fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let double = |x| x * 2;
    let triple = |x| x * 3;
    println!("Doubles: {:?}", numbers.iter().map(double).collect::<Vec<i32>>());
    println!("Triples: {:?}", numbers.iter().map(triple).collect::<Vec<i32>>());
}
