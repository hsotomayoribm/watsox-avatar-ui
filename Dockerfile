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

ENV NODE_ENV production

ENV REACT_APP_API_KEY='eyJzb3VsSWQiOiJkZG5hLWlibS1lbmFibGVtZW50LWJvb3RjYW1wLS1pYm0tYm90IiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfNWMzNzFkMGYtYTk2Zi00NmJkLTk0MmUtZjhlMDQ2YjM2NmU4In0='
ENV REACT_APP_ORCHESTRATION_MODE=true
ENV REACT_APP_PROXY_SERVER="https://watsonx-avatar-proxy.15fjwevzgqlg.us-south.codeengine.appdomain.cloud"
ENV REACT_APP_PREVIEW_LINK_BACKUP='https://www.ibm.com/design/language/877b208e9d05b37650a70e55867861bd/core_gray60_on_white.svg'

ENV PORT=3000

ENV ESLINT_NO_DEV_ERRORS=false

ENV REACT_APP_PROD=true

ENV REACT_APP_ORCHESTRATION_URL="https://watsonx-avatar-proxy.15fjwevzgqlg.us-south.codeengine.appdomain.cloud"

ENV DISABLE_ESLINT_PLUGIN=true
RUN npm run build

FROM base AS production
USER root
LABEL name="Soul Machines Watson NeuralSeek UI" \
  vendor="IBM" \
  #version="$IMAGE_VERSION" \
  summary="Web UI for Soul Machines" \
  description="Web interface for Soul Machines + Watson + NeuralSeek"

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