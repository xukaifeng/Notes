import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Notes',
  mode: 'site',
  hash: true,
  description: 'test',
  // more config: https://d.umijs.org/config
  menus: {},
  chainWebpack(memo: any) {
    // 设置 alias
    memo.resolve.alias.set('images', '../assets/image');
  },
  styles: [`body [data-updated-text*='Last'] { display: none; }`],
});
