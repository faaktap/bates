call git add .
call git commit -m "%*"
call git push origin master
date /T "%*" >> gitPushed.txt