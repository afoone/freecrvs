echo Backup of mongo db
CONTAINER_NAME=`docker ps | grep databases_mongo | awk '{print $NF}'`
backup_date=`date +'%Y%m%d'`
echo ${backup_date}
echo $CONTAINER_NAME
docker exec $CONTAINER_NAME mongoexport --host localhost --db gambia --collection vaccination > backups/backup_vaccination.json
docker exec $CONTAINER_NAME mongoexport --host localhost --db gambia --collection users > backups/backup_users.json
tar czvf backups/backup_${backup_date}.tgz backups/backup_vaccination.json backups/backup_users.json

