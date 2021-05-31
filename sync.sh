#/bin/bash

# init time for check sync time
seconds_init=`date +%s`

# Get last vaccination and users from production
echo 'get /home/covgm/freecrvs/backups/backup_vaccination.json' | sftp covgm@covid19.crvs.gm
echo 'get /home/covgm/freecrvs/backups/backup_users.json' | sftp covgm@covid19.crvs.gm

# get the container name
CONTAINER_NAME=`docker ps | grep mongo | awk '{print $NF}'`
echo Container name : $CONTAINER_NAME

# copy fresh 
docker cp backup_users.json $CONTAINER_NAME:/tmp
docker cp backup_vaccination.json $CONTAINER_NAME:/tmp
docker exec $CONTAINER_NAME mongoimport --host localhost --db gambia --collection vaccination --mode=merge --file /tmp/backup_vaccination.json
docker exec $CONTAINER_NAME mongoimport --host localhost --db gambia --collection users --mode=merge --file /tmp/backup_users.json

# Generatind local copy of mongo db
echo Local backup of mongo db
backup_date=`date +'%Y%m%d'`
machine_name=`hostnamectl | grep hostname |  awk '{print($NF);}'`
echo machine name ${machine_name}
docker exec $CONTAINER_NAME mongoexport --host localhost --db gambia --collection vaccination > backup_vaccination_local.json
tar_name=backup_${machine_name}_${backup_date}.tgz
tar czvf ${tar_name} backup_vaccination.json

# put the copy into production
echo put ${tar_name} | sftp root@crvs.gm

# calculating time consumed
seconds_end=`date +%s`
echo Done in `expr ${seconds_end} - ${seconds_init}` seconds



