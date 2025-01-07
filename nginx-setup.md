mv file trough ssh to server

`
sudo scp -i ~/.ssh/piek ./nginx.conf piekuser@45.10.110.58:~/
`

mv to the nginx subfolder on the server 
`
sudo mv ~/nginx.conf /etc/nginx/sites-available/chain-rpc.online
`

create a symlink to the new file

`
sudo ln -s /etc/nginx/sites-available/chain-rpc.online /etc/nginx/sites-enabled
`

system daemon config
`
 /etc/systemd/system/chain-rpc.online.service
`
