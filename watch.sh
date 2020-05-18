#!/bin/zsh
# for local env and run parameters
source config.sh

deno run --allow-run --allow-read watch.ts
# echo "YAHOO"