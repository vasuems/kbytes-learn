echo Hello > file1
ln file1 file2
echo file1 and file2 are the same file
[ $(stat -c %i file1) -eq $(stat -c %i file2) ] && echo Yes
