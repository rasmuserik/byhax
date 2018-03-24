(sleep 1; touch *.js) &
while inotifywait -e modify,close_write,move_self -q *.js */*.js
do 
  kill `cat .pid`
  sleep 0.1
  clear
  node index.js $@ &
  echo $! > .pid
  sleep 3
done
