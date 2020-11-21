#!/usr/bin/env bash
if [[ $1 == *l* ]]
then
  git pull
fi

if [[ $1 == *i* ]]
then
  yarn
fi

if [[ $1 == *b* ]]
then
  yarn build
fi

pm2 restart process.yml
