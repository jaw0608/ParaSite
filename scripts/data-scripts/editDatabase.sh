#!/bin/bash

if [ ! $1 ]; then
  echo "This script uses 3 parameters: [import|export] [database_name] [directoryToExport | directoryToImport]"
  echo "Echo of use: "
  echo "./editDatabase.sh import parasite-db dummyData/"
  echo "./editDatabase.sh export parasite-db dummyData/"
  exit 1
fi

operation=$1
db=$2
out_dir=$3
if [ -z $out_dir ]
then
  out_dir="./dataDump"
else
  mkdir -p $out_dir
fi

if [ "$operation" = 'import' ]; then
  cd $out_dir
  for i in *.json; do
    mongoimport --db $db --collection ${i/.json} --file $i
  done
fi
exit 1
