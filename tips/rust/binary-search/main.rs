fn main() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let target = 5;
    let mut left = 0;
    let mut right = arr.len() - 1;
    while left <= right {
        let mid = (left + right) / 2;
        if arr[mid] == target {
            println!("Found {} at index {}", target, mid);
            return;
        } else if arr[mid] < target {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    println!("{} not found", target);
}
