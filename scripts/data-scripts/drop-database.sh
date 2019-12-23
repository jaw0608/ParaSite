if [ ! $1 ]; then
  echo " It uses 1 parameter: [database_name]"
  echo " Example of use: "
  echo " ./drop-database.sh parasite-db"
  exit 1
fi

db=$1
mongo $db --eval "db.dropDatabase();"
