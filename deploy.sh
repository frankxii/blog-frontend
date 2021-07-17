scp -r blog-front.tar tencent:~
ssh tencent "docker rm -f blog-front"
ssh tencent "docker image rm blog-front"
ssh tencent "docker load --input blog-front.tar"
ssh tencent "docker run -d --name blog-front -p 80:80 blog-front"
ssh tencent "rm blog-front.tar"
