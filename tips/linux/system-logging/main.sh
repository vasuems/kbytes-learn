echo 'error: disk full' > log.txt
echo 'info: user logged in' >> log.txt
grep 'error' log.txt
