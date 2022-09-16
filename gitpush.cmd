call git add .
call git commit -m "%*"
call git push origin master
echo date /T "%*" >> gitPushed.txt