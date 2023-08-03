Skip to content
 Enterprise
Search or jump to…
Pull requests
Issues
Explore
 
@hsotomayor 
cust-care-solution-eng
/
sm-neuralseek-ibm
Public
forked from David-Levy/sm-neuralseek-ibm
1
0
8
Code
Pull requests
Projects
Wiki
Security
Insights
sm-neuralseek-ibm/react-ui/Dockerfile

Bob Fang dockerized for code engine
Latest commit 4802ee7 29 days ago
 History
 1 contributor
50 lines (36 sloc)  1.06 KB
   
# pull the base image
FROM node:16 as base
USER root

FROM base AS builder
USER root
WORKDIR /code
#RUN apk add --no-cache python3 py3-pip make g++

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
#RUN npm install -g typescript
RUN npm install --loglevel warn --production && npm install -g install-peerdeps
RUN install-peerdeps --dev eslint-config-airbnb
COPY . /code

ENV DISABLE_ESLINT_PLUGIN=true
RUN npm run build

FROM base AS production
USER root
LABEL name="Soul Machines Watson NeuralSeek UI" \
  vendor="IBM" \
  #version="$IMAGE_VERSION" \
  summary="Web UI for Soul Machines" \
  description="Web interface for Soul Machines + Watson + NeuralSeek"

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system watson 
RUN adduser --system watson --ingroup watson

RUN npm i -g pm2

# Create app directory
WORKDIR /home/watson

# Copy the built application
COPY --from=builder --chown=app:0 ["/code", "/home/watson"]

RUN chmod -R 777 /home/watson

USER watson

ENV HOME="/home/watson"

EXPOSE 3000

CMD ["npm", "run", "serve"]
© 2023 GitHub, Inc.
Help
Support
API
Training
Blog
About
GitHub Enterprise Server 3.3.19
Loading complete