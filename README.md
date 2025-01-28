# Deployment on AWS

    - Signup on AWS
    - Launch an instance
    - connect to instance using ssh
      - change permission of secret file using "chmod 400 <secret>.pem"
      - ssh -i "DevTinder Secret.pem" ubuntu@ec2-54-226-148-25.compute-1.amazonaws.com
    - Install node verion as same as your local machin node version(20.16.0)
    - Clone your project git repository on aws machine.

# Frontend

      - npm install --> install all required dependencies
      - npm run build
      - sudo apt update  --> it will update the system
      - sudo apt install nginx --> it will install nginx to system.
      - sudo  systemctl start nginx --> it will start nginx
      - sudo  systemctl enable nginx --> it will enable nginx.
      - Copy code from dist folder(build files) to /var/www/html/ folder.
      - sudo scp -r dist/* /var/www/html  --> cmd to copy files.
      - Enable port :80 on your instance

# Backend

      - npm install --> install all required dependencies
      - allowed ec2 instance public IP on mongodb server
      - npm install pm2 -g  --> install pm2 global to keep running backend 24/7
      - pm2 start npm -- start   --> start backend using pm2
      - pm2 logs   --> to get all the logs in case of issue
      - pm2 flush <nameOfProcess>    -->to clear all the logs
      - pm2 list, pm2 stop <name>, pm2 delete <name>
      - pm2 start npm --name "devTinder-backend" -- start  --> name a process
      - Enable port 7777 on your instance

# Frontend to Backend Connection

      - Frontend is running on http://54.172.97.209/
      - Backend is running on http://54.172.97.209:7777
      - so we need to map our backend to http://54.172.97.209:7777 to http://54.172.97.209/api/ by using nginx proxy pass.
      - Edit the nginx config code  in sudo nano /etc/nginx/sites-available/default
      - restart the nginx --> sudo systemctl restart nginx
      - modify the BASE_URL in frontend folder to "/api".

# Nginx config code

      - server {
    listen 80;
    server_name yourdomain.com;

    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/html;  # Replace with your static frontend files directory if needed
        index index.html;
    }

}

# Adding a custom Domain name

- Purchase domain name from domain provider(eg:-godaddy)
- signup on cloudflare and add a new domain name
- change the nameservers on godaddy and point it out to cloudflare
- wait for sometime till your nameservers are updated
- go to DNS record and point A --> devtinder.in --> AWS instance public IP add.
- Enable SSL cert on frontend and backend.

# Sending Emails via SES

    - Create a IAM user
    - Give user access of AmazonSESFullAccess
    - In Amazon SES: Create an Idnetity
    - Verify your domain name
    - Verify your email address
    - Install AWS SDK - v3
    - Code example  https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses
    - Setup Ses client
    - Access credentials should be created in IAM under SecurityCredentials Tab
    - Add the credentials to the env file
    - Write code for SesClient
    - Write code for sending email address
    - Make the email dynamic by passing more params to the run function  
