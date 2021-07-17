# build image and save tar package
rm blog-front.tar
docker build --tag blog-front .
docker save --output blog-front.tar blog-front
docker image rm blog-front