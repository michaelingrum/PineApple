sudo docker image prune -f 
cd ~/PineApple/server/
docker-compose down
git fetch origin
git reset --hard origin/master  &&  echo 'You are doing well'
docker-compose build && docker-compose --env-file ~/.env up -d 
