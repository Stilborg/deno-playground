#!/bin/zsh
source config.sh

deno run --inspect-brk --allow-net --allow-read=./static main.ts