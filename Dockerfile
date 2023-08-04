# pull the base image
FROM node:16

# set the working direction
WORKDIR /app

# add app
COPY . ./

# install app dependencies
COPY package.json ./

RUN npm install

ENV REACT_APP_API_KEY='eyJzb3VsSWQiOiJkZG5hLWlibS1lbmFibGVtZW50LWJvb3RjYW1wLS1pYm0tYm90IiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfNWMzNzFkMGYtYTk2Zi00NmJkLTk0MmUtZjhlMDQ2YjM2NmU4In0='

ENV REACT_APP_ORCHESTRATION_MODE=true
ENV REACT_APP_PROXY_SERVER="https://watsonx-avatar-proxy.15fjwevzgqlg.us-south.codeengine.appdomain.cloud"
ENV REACT_APP_PREVIEW_LINK_BACKUP='https://www.ibm.com/design/language/877b208e9d05b37650a70e55867861bd/core_gray60_on_white.svg'

ENV PORT=3000
ENV REACT_APP_ORCHESTRATION_URL="https://watsonx-avatar-proxy.15fjwevzgqlg.us-south.codeengine.appdomain.cloud"



EXPOSE 3000

CMD ["npm", "run", "serve"]