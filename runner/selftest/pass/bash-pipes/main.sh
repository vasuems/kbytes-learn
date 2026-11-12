printf 'pear\napple\npear\n' | sort | uniq -c | sed 's/^ *//'
