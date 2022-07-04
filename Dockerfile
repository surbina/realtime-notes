# How to run this image locally:
# 1. Build the image by running
#   > docker build . -t <image-name>
# 2. Run the image locally
#   > docker run -e FIREBASE_SERVICE_ACCOUNT -e NEXT_PUBLIC_ENVIRONMENT=dev -p 3001:3001 -d <image-name>
FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci -w backend
RUN npm run backend:build

EXPOSE 3001

CMD ["node", "apps/backend/dist/app.js"]
