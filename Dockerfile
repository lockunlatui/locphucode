FROM node:lts as dependencies
WORKDIR /locdo.tech
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /locdo.tech
COPY . .
COPY --from=dependencies /locdo.tech/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR ./locdo.tech
ENV NODE_ENV production

COPY --from=builder /locdo.tech/next.config.js ./
COPY --from=builder /locdo.tech/public ./public
COPY --from=builder /locdo.tech/.next ./.next
COPY --from=builder /locdo.tech/node_modules ./node_modules
COPY --from=builder /locdo.tech/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]