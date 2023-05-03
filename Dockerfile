FROM node:14 AS theme-deploy
ADD . /app

WORKDIR /app
RUN curl -s https://shopify.dev/themekit.py | python
CMD npm i && npm run build && theme deploy --env=shop --allow-live
