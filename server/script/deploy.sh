sudo docker image prune -f 
cd ~/PineApple/server/
export $(cat /home/ubuntu/.env)
docker-compose down
git fetch origin
git reset --hard origin/master  &&  echo 'You are doing well'
docker-compose build && docker-compose up -d