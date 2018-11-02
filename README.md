# DuckDNS-Updater

A simple node script to update a duckdns dynamicdns domain and relavent dns record with your current ip. Best suited for use cases where a dynamic ip needs to act static for a web server, or other applications.

## Installation instructions

`npm i` in the directory in a terminal to initalize the project, upon first running with node it will exit it's self having generated a config - fill out this config and then run it again, it will do the rest for you. run with CLI args `-v` or `--verbose` to log server responses and other information.

Keep the delay interval to `120000`ms for best results.

Leave ip blank for the ip to always update as the current ip the script is running on.
