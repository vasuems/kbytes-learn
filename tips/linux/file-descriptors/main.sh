echo Hello > file1
echo World > file2
exec 3< file1
exec 4< file2
cat <&3
 cat <&4
