# AWS-CC
credit card storage server running on an ec2 machine. written with node.js and implementing redis. basic auth is done with nginx.

1. libraries I use for node js (simple installation with npm):
2. express //elegant and simple web framework
3. body-parser //parse the body oof POST requests easily
4. uuid/v4 //generate tokens 
5. luhn //validate cc format
6. redis //in memory db of credit cards

The main difficulty was to install everything on the ec2 machine after writing it on my
windows computer, but because of the large scale use of ec2 machines I was able to find
all the blog posts I might need.
steps of installation on ec2:
1. connection with ssh and unique key file
2. downloading and installing node.js and np, with a few simple commands.
3. installing redis and testing it
4. copying the node.js code to the ec2 machine and installing all the
    required libraries with npm
5. installing nginx and updating the conf file
6. creating .htpasswd file for basic auth
7. testing with python requests





