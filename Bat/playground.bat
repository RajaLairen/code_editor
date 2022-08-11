@echo off

echo Enter filename without the extension

if EXIST %name%.java (
javac %name%.java
if not EXIST %name%.class (
color 4
echo There is some error
) Else (
color 0a
echo #############################################################################################################
echo ##################################################Output#####################################################
echo #############################################################################################################

java %name%)
 ) Else (
 color 0b
 echo  The file does not exist
 echo If you want to continue enter 1
 set cont=default
 set /p cont=
 if cont==1 (goto main))

pause