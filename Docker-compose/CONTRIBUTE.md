## Manual installation
— Install nodejs locally ( )
Clone the repo
- Install dependencies (npm install)
Start the DB locally
— docker run —e POSTGRES_PASSWORD=mysecretpassword —d —p 5432: 5432 postgres
— Go to neon.tech and get yourself a new DB
— Change the .env file and update your DB credentials
— npx prisma migrate dev
— npx prisma generate
— npm run build
— npm run start


## Docker installation 
 - Install Docker 
 - Build a network - `docker network create user-project`
 -Start the postgres DB 
    - `docker run --network user-project -e POSTGRES_PASSWORD=mysecretpass -d -p 5432:5432 --name postgres postgres`
 -Build the image - `docker build --network=host -t user .`
 -Start the image - `docker run -e DATABASE_URL=postgresql://postgres:mysecretpass@postgres:5432/postgres --network user-project -p 3000:3000 user`

## Docker compose installation

 - Install docker & docker compose 
 - Run `docker-compose up`
