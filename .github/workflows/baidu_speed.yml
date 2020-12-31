
name: 百度极速版
on:
  workflow_dispatch:
  schedule:
     - cron: '*/30 * * * *'
  watch:
    types: started
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
        BAIDU_COOKIE: ${{ secrets.BAIDU_COOKIE }}
        TZ: Asia/shanghai
    steps:
      - name: Checkout
        run: |
          git clone https://github.com/Sunert/Scripts.git ~/Scripts
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: npm install
        run: |
          cd ~/Scripts
          npm install
      - name: '运行 【百度极速】'
        if: env.BAIDU_COOKIE
        run: |
          cd ~/Scripts
          node Task/baidu_speed.js
        env:
          PUSH_KEY: ${{ secrets.PUSH_KEY }}
          BARK_PUSH: ${{ secrets.BARK_PUSH }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID }}
          BARK_SOUND: ${{ secrets.BARK_SOUND }}
          DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
          DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}
