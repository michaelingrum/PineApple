sudo docker image prune -f
cd ~/PineApple/server/
docker-compose --env-file /home/ubuntu/.env down
git fetch origin
git reset --hard origin/master  &&  echo 'You are doing well'
docker-compose --env-file /home/ubuntu/.env up -d --build

