# Deployment on AWS

    - Signup on AWS
    - Launch an instance
    - connect to instance using ssh 
      - change permission of secret file using "chmod 400 <secret>.pem"
      - ssh -i "DevTinder Secret.pem" ubuntu@ec2-54-226-148-25.compute-1.amazonaws.com
    - Install node verion as same as your local machin node version(20.16.0)
    - Clone your project git repository on aws machine.