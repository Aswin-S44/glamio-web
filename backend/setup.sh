set -e
echo "Starting backend setup..."


if [! -f .env]; then
    echo " .env file not found!, Copying from .env example"
    cp .env.example .env

fi

echo " Installing nodejs dependencies...."
npm install

echo " Running database migrations...."
npm run db:generate
npm run db:migrate

echo "Seeing database...."
npm run seed

echo " Setup completed :)"
