# 快手视频刷金币测试，抓包获取secrets

name: 快手视频浏览

on:
  workflow_dispatch:
  schedule:
     - cron: '*/15 0-14 * * *'
  watch:
    types: started
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
        KUAISHOUMV: ${{ secrets.KUAISHOUMV }}
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
      - name: '运行 【快手视频】'
        if: env.KUAISHOUMV
        run: |
          cd ~/Scripts
          node Task/Auto_Kuaishou.js
        env:
          PUSH_KEY: ${{ secrets.PUSH_KEY }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID }}
